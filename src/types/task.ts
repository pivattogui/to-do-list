import { Task, Status } from "@prisma/client";
import Joi from "joi";

export type TaskMinifield = Pick<Task, 'id' | 'title' | 'status' | 'content' | 'created_at' | 'priority'>

export type TaskStatus = Status

export type TaskPayload = Pick<Task, 'title' | 'content' | 'priority'>

export const TaskPayloadSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    priority: Joi.string().required()
})

export const TaskStatusSchema = Joi.object({
    status: Joi.string().valid('PENDING', 'DONE').required()
})
