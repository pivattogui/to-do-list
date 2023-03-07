import { NextApiRequest, NextApiResponse } from "next";
import { TaskPayload, TaskPayloadSchema } from "../../../../types/task";
import prisma from '../../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req

    const taskId = req.query.id as string

    switch (method) {
        case 'POST': {
            try {
                if(TaskPayloadSchema.validate(body).error) return res.status(400).json({ error: TaskPayloadSchema.validate(body).error })

                const payload = body as TaskPayload

                await prisma.task.update({
                    where:{
                        id: taskId
                    },
                    data:{
                        title: payload.title,
                        content: payload.content,
                    }
                })

                return res.status(200).json({ message: 'ok' })
            } catch (err) {
                return res.status(400).json({ error: err })
            }
        }
    }
} 