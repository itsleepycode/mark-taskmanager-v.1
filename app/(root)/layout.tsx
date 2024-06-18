import Sidebar from "@/components/fragment/sidebar/page";
import { authOption } from "@/libs/AuthOption";
import ContextProvider from "@/providers/ContextProvider";
import GlobalStyleProvider from "@/providers/GlobalStyleProvider";
import { getServerSession } from "next-auth";
import React from "react";

interface ProtectedRootLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedRoot({
  children,
}: ProtectedRootLayoutProps) {
  await getServerSession(authOption);
  return (
    <div className="w-full h-screen">
      <ContextProvider>
        <GlobalStyleProvider>
          <Sidebar />
          <div className="w-full">{children}</div>
        </GlobalStyleProvider>
      </ContextProvider>
    </div>
  );
}
