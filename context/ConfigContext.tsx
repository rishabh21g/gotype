"use client"

import { ConfigContextType } from "@/types/config";
import { createContext, use, useContext } from "react";

const ConfigContext = createContext<ConfigContextType | null>(null);

export const useConfig = () => {
  const ctx = useContext<ConfigContextType | null>(ConfigContext);
  
  if (!ctx) {
    throw new Error("useConfig must be used within ConfigProvider");
  }
  
  return ctx;
}

export default ConfigContext;