import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const { Pool } = pg;

// 1. Extração estrita da variável de ambiente
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("[Arquitetura] A variável DATABASE_URL não está definida no ambiente.");
}

// 2. Criação do Pool de Conexões nativo do PostgreSQL
const pool = new Pool({ connectionString });

// 3. Inicialização do Driver Adapter
const adapter = new PrismaPg(pool);

const prisma = global.prisma || new PrismaClient({
    adapter, // Injeção do contrato exigido pela v8+
    log: ['query', 'info', 'warn', 'error'],
});

// Preservação do Singleton no escopo global para hot-reload
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export default prisma;