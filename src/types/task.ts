import { Task } from "@prisma/client";
import Joi from "joi";

export type TaskMinifield = Pick<Task, 'id' | 'title' | 'status' | 'content' | 'created_at'>

export type TaskCreate = Pick<Task, 'title' | 'content' >

export const CreateTaskSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
})