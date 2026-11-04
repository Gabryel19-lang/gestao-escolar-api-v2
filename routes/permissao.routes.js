import { Router } from 'express';
import permissaoController from '../controllers/permissao.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verificarToken);
router.post('/', permissaoController.criar);
router.get('/', permissaoController.listar);
router.get('/:id', permissaoController.obterPorId);
router.put('/:id', permissaoController.atualizar);
router.delete('/:id', permissaoController.remover);

export default router;