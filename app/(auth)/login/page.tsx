import React from "react";
import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "@/libs/AuthOption";

export default async function Login() {
  const session = await getServerSession(authOption);
  if (session) {
    redirect("/");
  }
  return (
    <div className="text-colorIcons2 h-screen w-full flex items-center justify-center">
      <div className="px-5 bg-colorBg2 border-2 border-borderColor2 rounded-lg  sm:w-3/4 lg:w-auto">
        <h1 className="text-4xl mt-6 font-semibold text-center">Login here</h1>
        <hr className="my-5 border-borderColor2" />
        <LoginForm />
      </div>
    </div>
  );
}
