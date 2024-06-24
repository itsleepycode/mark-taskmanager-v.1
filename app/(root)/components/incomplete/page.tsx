"use client";
import { useGlobalState } from "@/components/atom/context/GlobalContextProvider";
import Task from "@/components/fragment/task/page";
import React from "react";

export default function Incomplete() {
  const { incompleteTasks } = useGlobalState();
  return <Task tasks={incompleteTasks} title="Incomplete Tasks" />;
}
