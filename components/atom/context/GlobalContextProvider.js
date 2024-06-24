"use client";
import { createContext, useState, useContext, useEffect } from "react";
import themes from "./theme";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const theme = themes[selectedTheme];

  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  const allTask = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get("/api/tasks");
      const sortedByDate = res.data.tasks.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      console.log(sortedByDate);
      setTasks(sortedByDate || []);
      // console.log(res.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (newTask) => {
    try {
      const res = await axios.post("/api/tasks", newTask);
      if (res.status === 200) {
        setTasks((prevTasks) => [...prevTasks, res.data.task]);
        toast.success("Task created successfully");
      } else {
        toast.error("Error creating task");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      if (res.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        toast.success("Task deleted successfully");
      } else {
        toast.error("Error deleting task");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting task");
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const res = await axios.put("/api/tasks", updatedTask);

      if (res.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          )
        );
        toast.success("Task updated successfully");
      } else {
        toast.error("Error updating task");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating task");
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapsedMenu = () => {
    setCollapsed(!collapsed);
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  // console.log(completedTasks);

  const importantTasks = tasks.filter((task) => task.isImportant === true);
  // console.log(importantTasks);

  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  // console.log(incompleteTasks);

  useEffect(() => {
    if (session) {
      // console.log(session.user);
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    allTask();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        allTask,
        deleteTask,
        updateTask,
        createTask,
        completedTasks,
        importantTasks,
        incompleteTasks,
        isLoading,
        user,
        collapsed,
        collapsedMenu,

        modal,
        openModal,
        closeModal,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdateState = () => useContext(GlobalUpdateContext);
