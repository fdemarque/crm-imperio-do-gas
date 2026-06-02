import { Router } from 'express';
import multer from 'multer';
import { createClient, getClients, updateClient, deleteClient, uploadClientsCsv } from '../controllers/clientController';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', createClient);
router.get('/', getClients);
router.put('/:id', roleMiddleware('adm'), updateClient);
router.delete('/:id', roleMiddleware('adm'), deleteClient);
router.post('/upload-csv', roleMiddleware('adm'), upload.single('file'), uploadClientsCsv);

export default router;
