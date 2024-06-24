"use client";
import CreateTask from "@/app/(root)/components/modals/CreateTask";
import Modal from "@/app/(root)/components/modals/Modal";
import TaskItem from "@/app/(root)/components/taskItem/page";
import { useGlobalState } from "@/components/atom/context/GlobalContextProvider";
import { plus } from "@/utils/Icons";
import React, { useEffect } from "react";
import styled from "styled-components";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
}

interface Props {
  title: string;
  tasks: Task[];
}

export default function Task({ title, tasks }: Props) {
  const { theme, isLoading, openModal, modal } = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateTask />} />}
      <h1>{title}</h1>
      {!isLoading ? (
        <div className="tasks grid">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
          <button className="create-task" onClick={openModal}>
            {plus}
            Add new Task
          </button>
        </div>
      ) : (
        <div className="tasks-loader w-full h-[38rem] flex items-center  justify-center">
          <span className="loader2"></span>
        </div>
      )}
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

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;

      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
