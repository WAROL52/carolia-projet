import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prismaInstance } from "@/lib/prisma/prismaInstance";

// const prisma = new PrismaClient()

export const authOptions={
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "votre email..." },
          password: { label: "Mot de passe", type: "password" }
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          const account=await prismaInstance.account.findUnique({
            where:{
              email:credentials?.email,
              User:{
              password:credentials?.password
            }},
            include:{
              User:true
            }
          })
          // If no error and we have user data, return it
          if (account) {
            return {
              id:String(account.id),
              email:account.email,
              name:account.name,
              image:account.image
            }
          }
          // Return null if user data could not be retrieved
          return null
        }
      })
    ]
}

const authHandler = NextAuth(authOptions)
export { authHandler as GET, authHandler as POST }
// const emailProvider=EmailProvider({
//     server: {
//       host: process.env.EMAIL_SERVER_HOST,
//       port: process.env.EMAIL_SERVER_PORT,
//       auth: {
//         user: process.env.EMAIL_SERVER_USER,
//         pass: process.env.EMAIL_SERVER_PASSWORD
//       }
//     },
//     from: process.env.EMAIL_FROM
// })