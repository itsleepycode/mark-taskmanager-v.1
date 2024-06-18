"use client";
import React from "react";

interface Props {
  task: any;
}

export default function TaskItem({ task }: Props) {
  const { title, description, date, completed, important } = task;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
}
