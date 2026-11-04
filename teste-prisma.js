
import prisma from './config/database.js'

try {
    const usuarios = await prisma.usuario.count()

    console.log('Conexão com Neon realizada com sucesso!')
    console.log('Usuários cadastrados:', usuarios)

} catch (error) {
    console.error('Erro na conexão:', error.message)

} finally {
    await prisma.$disconnect()
}
