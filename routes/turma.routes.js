import { Router } from 'express';
import turmaController from '../controllers/turma.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verificarToken);
router.post('/', turmaController.criar);
router.get('/', turmaController.listar);
router.get('/:id', turmaController.obterPorId);
router.put('/:id', turmaController.atualizar);
router.delete('/:id', turmaController.remover);

export default router;