"use client";
import { useGlobalState } from "@/components/atom/context/GlobalContextProvider";
import { plus } from "@/utils/Icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

export default function EditTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { theme, allTask, closeModal, updateTask, taskToEdit } =
    useGlobalState();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDate(taskToEdit.date);
      setCompleted(taskToEdit.isCompleted);
      setImportant(taskToEdit.isImportant);
    }
  }, [taskToEdit]);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedTask = {
      title,
      description,
      date,
      isCompleted: completed,
      isImportant: important,
    };

    try {
      const res = await axios.patch(`/api/tasks/${taskToEdit.id}`, updatedTask);

      if (res.status === 200) {
        const data = res.data;
        updateTask(data.task);
        toast.success("Task updated successfully");
      } else {
        toast.error(res.data.error || "Something went wrong.");
      }

      closeModal();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <CreateTaskStyled theme={theme}>
      <div>
        <h1>Edit Task</h1>
        <div className="input-control">
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChange("title")}
            type="text"
            id="title"
            value={title}
            name="title"
            placeholder="Set title here..."
          />
        </div>
        <div className="input-control">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={handleChange("description")}
            value={description}
            name="description"
            id="description"
            rows={4}
            placeholder="Description"
          />
        </div>
        <div className="input-control">
          <label htmlFor="date">Date</label>
          <input
            onChange={handleChange("date")}
            value={date}
            type="date"
            name="date"
            id="date"
          />
        </div>
        <div className="input-control toggler">
          <label htmlFor="completed">Toggle Complete</label>
          <input
            onChange={handleChange("completed")}
            checked={completed}
            value={completed.toString()}
            type="checkbox"
            name="completed"
            id="completed"
          />
        </div>
        <div className="input-control toggler">
          <label htmlFor="important">Toggle Important</label>
          <input
            onChange={handleChange("important")}
            checked={important}
            value={important.toString()}
            type="checkbox"
            name="important"
            id="important"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="submit-btn" onClick={handleSubmit}>
          {plus}
          <span>Finish Editing</span>
        </button>
      </div>
    </CreateTaskStyled>
  );
}

const CreateTaskStyled = styled.div`
  h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};

      border-radius: 0.5rem;
    }
  }

  .submit-btn {
    position: relative;
    padding: 0.8rem 2rem;
    border-radius: 0.8rem;
    font-weight: 500;
    font-size: 1.2rem;
    background: rgb(9, 95, 170);
    align-items: center;
    transition: all 0.3s ease-in-out;

    i {
      margin-right: 0.7rem;
    }

    &:hover {
      background-color: rgb(60, 152, 233);
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;
