"use client";
import axios from "axios";
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
        toast.error("Error creating task.");
      } else {
        toast.success("Task created successfully.");

        setTitle("");
        setDescription("");
        setDate("");
        setCompleted(false);
        setImportant(false);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1>Create Task</h1>
        <div className="input-control">
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChange("title")}
            type="text"
            id="title"
            value={title}
            name="title"
            placeholder="Title"
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
        <div className="input-control">
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
      <div className="submit-btn">
        <button onClick={handleSubmit}>
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
}
