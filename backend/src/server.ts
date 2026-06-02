import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import clientRoutes from './routes/clientRoutes';
import automationRoutes from './routes/automationRoutes';
import whatsappRoutes from './routes/whatsappRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4200',
  }
});
app.set('io', io);

app.use('/api/clients', clientRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/whatsapp', whatsappRoutes);

app.get('/', (req, res) => {
  res.send('API do CRM Império do Gás está rodando!');
});

httpServer.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
