import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const router = Router();

// ==========================================
// ROTAS DE AUTENTICAÇÃO
// ==========================================

// Rota pública para emissão do JWT
router.post('/login', authController.login);

export default router;