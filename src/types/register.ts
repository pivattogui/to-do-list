import { User } from "@prisma/client";
import Joi from "joi";

export type UserMinifield = Pick<User, 'id' | 'name' | 'email'>

export type RegisterUser = Pick<User, 'name' | 'email' | 'password'>

export const RegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

