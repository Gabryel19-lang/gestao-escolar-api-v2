import { Router } from 'express'
import * as controller from '../controllers/generic.controller.js'
import { autenticar } from '../controllers/auth.controller.js'
import { validarRequisicao } from '../middlewares/validacao.middleware.js'

const router = Router()

// ==========================================
// ROTAS PÚBLICAS 
// ==========================================

// Cadastro público de usuários
router.post('/usuarios', (req, res, next) => {
  req.params.tabela = 'usuario' 
  next()
}, validarRequisicao, controller.criar)

// Vitrine pública de Cursos
router.get('/vitrine', (req, res, next) => {
  req.params.tabela = 'cursos' 
  next()
}, controller.listar)


// ==========================================
// ROTAS PROTEGIDAS (Admin - Exigem Token)
// ==========================================

// Injeção do middleware "validarRequisicao" antes da função criar e atualizar
router.post('/:tabela', autenticar, validarRequisicao, controller.criar)
router.get(['/:tabela/:id', '/:tabela'], autenticar, controller.listar)
router.patch('/:tabela/:id', autenticar, validarRequisicao, controller.atualizar)
router.delete('/:tabela/:id', autenticar, controller.remover)

export default router