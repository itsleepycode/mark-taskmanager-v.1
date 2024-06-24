import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nickname: string;
      email: string;
    };
  }

  interface User {
    id: string;
    nickname: string;
    email: string;
  }
}
