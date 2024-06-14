"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

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
        setCompleted(e.target.value);
        break;
      case "important":
        setImportant(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.ok) {
        toast.success("Task created successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Create Task</h1>
        <div className="input-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={handleChange("title")}
            placeholder="Title"
          />
        </div>
        <div className="input-control">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={handleChange("description")}
            name="description"
            id="description"
            rows={4}
            placeholder="Description"
          />
        </div>
        <div className="input-control">
          <label htmlFor="date">Date</label>
          <input
            value={date}
            onChange={handleChange("date")}
            type="date"
            name="date"
            id="date"
          />
        </div>
        <div className="input-control">
          <label htmlFor="completed">Toggle Complete</label>
          <input
            checked={completed}
            value={completed.toString()}
            onChange={handleChange("completed")}
            type="checkbox"
            name="completed"
            id="completed"
          />
        </div>
        <div className="input-control toggler">
          <label htmlFor="important">Toggle Important</label>
          <input
            checked={important}
            value={important.toString()}
            onChange={handleChange("important")}
            type="checkbox"
            name="important"
            id="important"
          />
        </div>
      </div>
      <div className="submit-btn">
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
