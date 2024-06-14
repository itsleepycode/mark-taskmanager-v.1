"use client";
import { createContext, useState, useContext } from "react";
import themes from "./theme";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const theme = themes[selectedTheme];

  return (
    <GlobalContext.Provider
      value={{
        theme,
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
