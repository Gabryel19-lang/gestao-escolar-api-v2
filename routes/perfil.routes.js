import { Router } from 'express';
import perfilController from '../controllers/perfil.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verificarToken);
router.post('/', perfilController.criar);
router.get('/', perfilController.listar);
router.get('/:id', perfilController.obterPorId);
router.put('/:id', perfilController.atualizar);
router.delete('/:id', perfilController.remover);

export default router;