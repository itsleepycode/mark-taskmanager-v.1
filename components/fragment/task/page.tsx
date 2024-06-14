"use client";
import CreateTask from "@/app/components/modals/CreateTask";
import { useGlobalState } from "@/components/atom/context/GlobalContextProvider";
import { useSession } from "next-auth/react";
import React from "react";
import styled from "styled-components";

export default function Task() {
  const { theme } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      <CreateTask />
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::webkit-scrollbar {
    width: 0.5rem;
  }
`;
