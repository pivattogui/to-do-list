import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'

const do_it = async () => {
    const passHashed = await bcrypt.hash("teste123", 11)

    
    await prisma.user.create({
        data: {
            name: "Teste",
            email: "teste@teste.com",
            password: passHashed,
        }
    })
        

}

do_it()
