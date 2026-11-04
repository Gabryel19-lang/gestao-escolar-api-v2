import { Router } from 'express';
import cursoController from '../controllers/curso.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verificarToken);
router.post('/', cursoController.criar);
router.get('/', cursoController.listar);
router.get('/:id', cursoController.obterPorId);
router.put('/:id', cursoController.atualizar);
router.delete('/:id', cursoController.remover);

export default router;