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
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nickname = user.nickname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.nickname =
          typeof token.nickname === "string" ? token.nickname : "";
        session.user.email = typeof token.email === "string" ? token.email : "";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
