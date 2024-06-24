"use client";
import React from "react";

interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  label: string;
}

export default function Input({
  value,
  onChange,
  disabled,
  type,
  label,
}: InputProps) {
  return (
    <div className="relative w-full lg:w-[30rem]">
      <div>
        <label className="text-colorIcons2">{label}</label>
      </div>
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        className="outline-none p-2 bg-borderColor1 border-2 text-colorIcons2 border-borderColor2 rounded-md w-full focus:bg-colorBg3 transition-all"
      />
    </div>
  );
}
