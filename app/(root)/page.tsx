"use client";
import { useGlobalState } from "@/components/atom/context/GlobalContextProvider";
import Task from "@/components/fragment/task/page";
import React from "react";

export default function page() {
  const { tasks } = useGlobalState();
  return <Task tasks={tasks} title="All Tasks" />;
}
