import { FormStep, Role } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"
import { PrivateProps, SessionProps, SessionUser } from "./auth"

declare module "next-auth" {
    interface Session {
        user: SessionUser
    }
}

declare module "next-auth/jwt" {
    interface JWT extends SessionProps extends PrivateProps { }
}