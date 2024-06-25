"use client";
import { useGlobalState } from "@/components/atom/context/GlobalContextProvider";
import { edit, trash } from "@/utils/Icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/utils/formatDate";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
}

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const { theme, deleteTask, updateTask, setTaskToEdit, openModal } =
    useGlobalState();
  const { id, title, description, date, isCompleted, isImportant } = task;

  const handleStatusToggle = () => {
    const updatedTask = { ...task, isCompleted: !isCompleted };
    updateTask(updatedTask);
  };

  const handleEdit = () => {
    setTaskToEdit(task);
    openModal("editTask", true);
  };

  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button className="completed" onClick={handleStatusToggle}>
            Completed
          </button>
        ) : (
          <button className="incomplete" onClick={handleStatusToggle}>
            Incomplete
          </button>
        )}
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>
        <button className="delete" onClick={() => deleteTask(task.id)}>
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.main`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background-color: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background-color: ${(props) => props.theme.colorGreenDark};
    }
  }
`;
