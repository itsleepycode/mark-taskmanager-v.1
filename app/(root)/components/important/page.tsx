"use client";
import { useGlobalState } from "@/components/atom/context/GlobalContextProvider";
import Task from "@/components/fragment/task/page";
import React from "react";

export default function Important() {
  const { importantTasks } = useGlobalState();
  return <Task tasks={importantTasks} title="Important Tasks" />;
}
