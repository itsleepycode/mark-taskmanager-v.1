"use client";
import Input from "@/components/atom/Input";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {};

  return (
    <div className="space-y-5 flex flex-col items-center text-colorIcons2">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        type="email"
      />
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
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
