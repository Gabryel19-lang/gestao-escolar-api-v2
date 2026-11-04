import { Router } from 'express';
import docenteController from '../controllers/docente.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verificarToken);
router.post('/', docenteController.criar);
router.get('/', docenteController.listar);
router.get('/:id', docenteController.obterPorId);
router.put('/:id', docenteController.atualizar);
router.delete('/:id', docenteController.remover);

export default router;