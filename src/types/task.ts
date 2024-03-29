import { Task, Status, Priority } from "@prisma/client";
import Joi from "joi";

export type TaskMinifield = Pick<Task, 'id' | 'title' | 'status' | 'content' | 'created_at'> & {
    priority: TaskPriority
}

export type TaskStatus = Status

export type TaskPayload = Pick<Task, 'title' | 'content'> & {
    priority: TaskPriority
}

export const TaskPayloadSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    priority: Joi.string().required()
})

export const TaskStatusSchema = Joi.object({
    status: Joi.string().valid('PENDING', 'DONE').required()
})

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH"

export type TaskPriorityOptions = {
    name: string
    type: TaskPriority
}[]