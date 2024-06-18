import React from "react";
import RegisterForm from "./components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOption } from "@/libs/AuthOption";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOption);
  if (session) {
    redirect("/");
  }
  return (
    <div className="text-colorIcons2 h-screen w-full flex items-center justify-center">
      <div className="px-5 bg-colorBg2 border-2 border-borderColor2 rounded-lg  sm:w-3/4 lg:w-auto">
        <h1 className="text-4xl mt-6 font-semibold text-center">
          Register here
        </h1>
        <hr className="my-5 border-borderColor2" />
        <RegisterForm />
      </div>
    </div>
  );
}
