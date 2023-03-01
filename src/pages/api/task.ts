import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { TaskCreate, CreateTaskSchema } from '../../types/task';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    const { method, body } = req

    switch (method) {
        case 'GET': {
            try {
                const tasks = await prisma.task.findMany({
                    where: {
                        user_id: session.user.id
                    },
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        content: true,
                        created_at: true,
                    }
                })

                
                        

                res.status(200).json(tasks)
            } catch (err) {
                res.status(400).json({ message: "error" })
            }
        }
        case 'POST': {
            try {
                if(CreateTaskSchema.validate(body).error) return res.status(400).json({ error: CreateTaskSchema.validate(body).error })

                const payload = body as TaskCreate

                await prisma.task.create({
                    data: {
                        title: payload.title,
                        content: payload.content,
                        user_id: session.user.id,
                    }
                })
                

                res.status(200).json({ message: "ok" })
            } catch (err) {
                res.status(400).json({ message: "error" })
            }
        }
        case 'PUT': {
            try {
                res.status(200).json({ message: "ok" })
            } catch (err) {
                res.status(400).json({ message: "error" })
            }
        }
        case 'DELETE': {
            try {
                res.status(200).json({ message: "ok" })
            } catch (err) {
                res.status(400).json({ message: "error" })
            }
        }
    }
}