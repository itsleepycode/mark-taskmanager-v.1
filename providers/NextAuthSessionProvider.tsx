"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface NextAuthSessionProvider {
  children: React.ReactNode;
}

export default function NextAuthSessionProvider({
  children,
}: NextAuthSessionProvider) {
  return <SessionProvider>{children}</SessionProvider>;
}
