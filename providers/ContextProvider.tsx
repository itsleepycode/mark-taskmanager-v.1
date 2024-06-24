"use client";
import React from "react";
import GlobalContextProvider from "@/components/atom/context/GlobalContextProvider";
import ToastProvider from "./ToastProvider";

interface Props {
  children: React.ReactNode;
}

export default function ContextProvider({ children }: Props) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <GlobalContextProvider>
      <ToastProvider />
      {children}
    </GlobalContextProvider>
  );
}
