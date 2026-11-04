
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Verifica se a URL do banco existe
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não configurada no .env')
}

// Configura a conexão com PostgreSQL
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

// Inicializa o Prisma
const prisma = new PrismaClient({ adapter })

export default prisma
