"use client";
import Input from "@/components/atom/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const router = useRouter();

  const login = async () => {
    if (!EMAIL_REGEX.test(email)) {
      toast.error("Email tidak valid");
    }

    setLoading(true);
    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.ok) {
      toast.success("Login Berhasil");
      router.push("/");
    } else if (login?.error) {
      toast.error(login?.error);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-5 flex flex-col items-center text-colorIcons2">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button
        onClick={login}
        className="border-2 border-borderColor2 px-12 py-2 rounded-lg font-semibold hover:bg-colorBg3 transition-all"
      >
        Login
      </button>
      <div className="pb-5">
        Dont have an account?{" "}
        <Link className="font-semibold" href="/register">
          Register here
        </Link>
      </div>
    </div>
  );
}
