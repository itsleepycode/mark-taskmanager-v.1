import Sidebar from "@/components/fragment/sidebar/page";
import ContextProvider from "@/providers/ContextProvider";
import GlobalStyleProvider from "@/providers/GlobalStyleProvider";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

interface ProtectedRootLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedRoot({
  children,
}: ProtectedRootLayoutProps) {
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
