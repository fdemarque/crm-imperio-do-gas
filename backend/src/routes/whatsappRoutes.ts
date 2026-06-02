import { Router } from 'express';
import { startClient } from '../services/whatsappService';

const router = Router();

router.post('/start', (req, res) => {
  const io = req.app.get('io');
  if (!io) {
    return res.status(500).json({ error: 'Socket.io not initialized' });
  }
  
  try {
    startClient(io);
    res.json({ message: 'Conexão do WhatsApp iniciada com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
