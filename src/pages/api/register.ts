import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { RegisterSchema, RegisterUser } from '../../types/register';
import prisma from '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req

    switch (method) {
        case 'POST': {
            try {
                if (RegisterSchema.validate(body).error) return res.status(400).json({ error: RegisterSchema.validate(body).error })

                const payload = body as RegisterUser

                const passHashed = await bcrypt.hash(payload.password, 11)

                const user = await prisma.user.findUnique({
                    where:{
                        email: payload.email
                    }
                })

                if(user) return res.status(400).json({ message: "user already exists" })

                await prisma.user.create({
                    data: {
                        name: payload.name,
                        email: payload.email,
                        password: passHashed,
                    }
                })

                return res.status(200).json({ message: "ok" })
            } catch (err) {
                return res.status(400).json({ message: "error" })
            }
        }
    }
}