import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { Server } from 'socket.io';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

let isInitialized = false;

export const startClient = (io: Server) => {
  if (isInitialized) {
    console.log('Cliente do WhatsApp já foi iniciado anteriormente.');
    return;
  }
  isInitialized = true;
  console.log('Iniciando cliente do WhatsApp em background...');

  client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
    console.log('👆 Escaneie o QR Code acima para autenticar no WhatsApp');
    io.emit('whatsapp_qr', qr);
  });

  client.on('authenticated', () => {
    console.log('🔐 Autenticado no WhatsApp!');
    io.emit('whatsapp:authenticated');
  });

  client.on('ready', () => {
    console.log('✅ Cliente do WhatsApp está pronto!');
    io.emit('whatsapp:ready');
  });

  client.on('disconnected', (reason) => {
    console.log('⚠️ Cliente do WhatsApp desconectado:', reason);
    io.emit('whatsapp:disconnected', reason);
  });

  client.initialize();
};

export const sendMessage = async (number: string, text: string) => {
  try {
    if (!client.info) {
      throw new Error('Cliente do WhatsApp ainda não está pronto');
    }
    
    // Assumindo que number vem apenas com digitos numéricos (ex: 5511999999999)
    const chatId = `${number}@c.us`;
    await client.sendMessage(chatId, text);
    console.log(`✉️ Mensagem enviada para ${number}`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error);
    throw error;
  }
};
