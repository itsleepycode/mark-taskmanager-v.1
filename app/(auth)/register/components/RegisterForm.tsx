"use client";
import Input from "@/components/atom/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const register = async () => {
    setLoading(true);
    if (EMAIL_REGEX.test(email)) {
      try {
        await axios.post("/api/register", {
          nickname,
          email: email,
          password: password,
        });

        toast.success("Registered successfully");
        router.push("/login");
      } catch (error) {
        console.log(error);
        toast.error("Register failed");
      }
    }
  };

  return (
    <form
      onSubmit={register}
      className="space-y-5 flex flex-col items-center text-colorIcons2"
    >
      <Input
        label="Username"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        disabled={loading}
        type="text"
      />
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
      <button className="border-2 border-borderColor2 px-12 py-2 rounded-lg font-semibold hover:bg-colorBg3 transition-all">
        Register
      </button>
      <div className="pb-5">
        Already have an account?{" "}
        <Link className="font-semibold" href="/login">
          Login here
        </Link>
      </div>
    </form>
  );
}
