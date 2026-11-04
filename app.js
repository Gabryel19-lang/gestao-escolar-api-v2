import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Importação das Rotas de Domínio
import alunoRoutes from './routes/aluno.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import authRoutes from './routes/auth.routes.js';
import cursoRoutes from './routes/curso.routes.js';
import docenteRoutes from './routes/docente.routes.js';
import turmaRoutes from './routes/turma.routes.js';
import perfilRoutes from './routes/perfil.routes.js';
import permissaoRoutes from './routes/permissao.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuração de Segurança de Fronteira (CORS)
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares de Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disponibilização de ficheiros estáticos (Views)
app.use(express.static(path.join(__dirname, 'views')));

// Rota de Health Check / Página Inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// ==========================================
// REGISTO DE ROTAS DA API
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/perfis', perfilRoutes);
app.use('/api/permissoes', permissaoRoutes);

app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/turmas', turmaRoutes);

// Fallback para Rotas Inexistentes (404)
app.use((req, res) => {
    res.status(404).json({ erro: "O endpoint solicitado não foi localizado na API." });
});

export default app;