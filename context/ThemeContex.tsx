import { createContext, useContext } from "react";

interface ThemeContextType {
    theme: "light" | "dark" | "system";
    settheme: (theme: "light" | "dark" | "system") => void;
}

export const ThemeContext = createContext<ThemeContextType| null>(null);

export const useTheme = () => {
    const ctx = useContext(ThemeContext)
    if (ctx) {
        return ctx
    }
    throw new Error("useTheme must be used within a ThemeProvider")
}