"use client";
import { useGlobalState } from "@/components/atom/context/GlobalContextProvider";
import Task from "@/components/fragment/task/page";
import React from "react";

export default function Completed() {
  const { completedTasks } = useGlobalState();
  return <Task tasks={completedTasks} title="Completed Tasks" />;
}
