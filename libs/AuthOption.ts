import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = { id: "1", name: "root", email: "rootaja@gmail.com" };

        if (user) {
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
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
