import { Task, Status } from "@prisma/client";
import Joi from "joi";

export type TaskMinifield = Pick<Task, 'id' | 'title' | 'status' | 'content' | 'created_at'>

export type TaskStatus = Status

export type TaskPayload = Pick<Task, 'title' | 'content'>

export const TaskPayloadSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
})
