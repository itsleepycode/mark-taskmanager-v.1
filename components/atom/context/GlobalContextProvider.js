"use client";
import { createContext, useState, useContext, useEffect } from "react";
import themes from "./theme";
import axios from "axios";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const theme = themes[selectedTheme];

  const allTask = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    allTask();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
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
