import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import { SHARED_PROPS } from "../../../types/auth"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credenciais",
      credentials: {
        username: { label: "E-mail", type: "text" },
        uuid: { label: "UUID", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          //check de sanidade
          if (!credentials) return null

          //precisa ter uuid ou user e senha
          if (!credentials.uuid && !(credentials.username && credentials.password)) return null

          //pega usuario pelo email, depois checa senha
          const user_exists = await prisma.user.findUnique({
            where: {
              ...(credentials.uuid ? { id: credentials.uuid } : { email: credentials.username }),
            },
            select: {
              id: true,
              password: true,
            }
          })

          if (!user_exists || user_exists.password == null) return null

          if (!credentials.uuid) {
            //se hash da senha bate

            const compare = bcrypt.compareSync(credentials.password, user_exists.password)
            if (!compare) return null
          }

          return {
            id: user_exists.id,
          }
        }
        catch (err) {
          console.error(err)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //checks de sanidade

      if (!credentials?.username || !user.id) {
        return false
      }

      //pega usuario pelo id
      const user_exists = await prisma.user.findUnique({
        where: {
          id: user.id
        },
      })

      if (!user_exists) {
        return false
      } else {
        return true

      }

    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      //checks de sanidade
      if (!session) {
        return session
      }

      for (const prop of SHARED_PROPS) {
        if (token[prop]) session = { ...session, user: { ...session.user, [prop]: token[prop] } }
      }

      const current_session_keys = Object.keys(session.user)

      if (!SHARED_PROPS.every(prop => current_session_keys.includes(prop))) return


      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      //pega usuario pelo id
      const user_exists = await prisma.user.findUnique({
        where: {
          id:token.sub
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      })

      if (!user_exists) return token

      token = {
        ...token,
        id: user_exists.id,
        name: user_exists.name,
        email: user_exists.email,
      }
      
      return token
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
  },
}

export default NextAuth(authOptions);
