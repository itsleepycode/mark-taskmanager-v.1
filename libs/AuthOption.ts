import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "./prismadb";
import toast from "react-hot-toast";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text", label: "Email" },
        password: { type: "password", label: "Password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credentials tidak ditemukan");
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.password) {
          throw new Error("User tidak ditemukan");
        }

        if (user) {
          const decode = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!decode) {
            toast.error("Password salah");
          }

          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }

      return { ...token, id: user.id };
    },
    async session({ session, token }) {
      return {
        ...session,
        id: token.id,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
