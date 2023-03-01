import { User } from "@prisma/client";
import Joi from "joi";

export type UserMinifield = Pick<User, 'id' | 'name' | 'email'>

export type UserCreate = Pick<User, 'name' | 'email' | 'password'>

export const CreateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})