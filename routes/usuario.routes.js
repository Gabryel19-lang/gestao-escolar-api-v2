import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// ==========================================
// ROTAS DE UTILIZADOR
// ==========================================

// PÚBLICA: Registo de novas contas
router.post('/', usuarioController.criar);

// PROTEGIDAS: Gestão de utilizadores (Exige Token JWT)
router.use(verificarToken);
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.obterPorId);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.remover);

export default router;