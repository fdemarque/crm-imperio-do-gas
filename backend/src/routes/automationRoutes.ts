import { Router } from 'express';
import { createAutomation, getAutomations, toggleAutomationStatus } from '../controllers/automationController';

const router = Router();

router.post('/', createAutomation);
router.get('/', getAutomations);
router.patch('/:id/status', toggleAutomationStatus);

export default router;
