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
    return null;
  }

  return (
    <GlobalContextProvider>
      <ToastProvider />
      {children}
    </GlobalContextProvider>
  );
}
