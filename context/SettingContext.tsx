"use client"
import { SettingsContextType } from "@/types/settings-context";
import { createContext, useContext } from "react";

export const SettingContext = createContext<SettingsContextType | null>(null);

export function useSettings() {
  const ctx = useContext<SettingsContextType|null>(SettingContext);
  
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  
  return ctx;
}