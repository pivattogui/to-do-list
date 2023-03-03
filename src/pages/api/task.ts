import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { TaskCreate, CreateTaskSchema } from '../../types/task';
import prisma from '../../lib/prisma'

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

                return res.status(200).json(tasks)
            } catch (err) {
                return res.status(400).json({ error: err })
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
                

                return res.status(200).json({ message: "ok" })
            } catch (err) {
                return res.status(400).json({ error: err })
            }
        }
        case 'PUT': {
            try {
                return res.status(200).json({ message: "ok" })
            } catch (err) {
                return res.status(400).json({ error: err })
            }
        }
        case 'DELETE': {
            try {
                return res.status(200).json({ message: "ok" })
            } catch (err) {
                return res.status(400).json({ error: err })
            }
        }
    }
}