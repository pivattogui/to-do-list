import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { CreateUserSchema, UserCreate } from '../../types/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req

    switch (method) {
        case 'POST': {
            try {
                if (CreateUserSchema.validate(body).error) return res.status(400).json({ error: CreateUserSchema.validate(body).error })

                const payload = body as UserCreate

                const passHashed = await bcrypt.hash(payload.password, 11)

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