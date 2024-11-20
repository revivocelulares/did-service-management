import { Router } from 'express';
import { DIDController } from '../controllers/did.controller.js';

const router = Router();

router.post('/create', DIDController.createDID);
router.get('/resolve/:did', DIDController.resolveDID);

export default router;