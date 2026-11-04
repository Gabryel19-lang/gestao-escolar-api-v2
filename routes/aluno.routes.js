import { Router } from 'express';
import alunoController from '../controllers/aluno.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// ==========================================
// ROTAS DO DOMÍNIO ALUNO (CRUD COMPLETO)
// Todas as rotas estão protegidas pela fechadura do JWT
// ==========================================
router.use(verificarToken); // Aplica o middleware a TODAS as rotas abaixo

router.post('/', alunoController.criar);
router.get('/', alunoController.listar);
router.get('/:id', alunoController.obterPorId);
router.put('/:id', alunoController.atualizar);
router.delete('/:id', alunoController.remover); // Executa o Soft Delete

export default router;