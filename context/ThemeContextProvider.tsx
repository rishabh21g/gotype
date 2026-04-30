"use client"
import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContex";


const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, settheme] = useState<"light" | "dark" | "system">("dark");
    
    useEffect(() => {
        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle("dark", isDark);
            document.documentElement.classList.toggle("light", !isDark);
        } else {
            document.documentElement.classList.toggle("dark", theme === "dark");
            document.documentElement.classList.toggle("light", theme === "light");
        }
    }, [theme]);
    return (<ThemeContext.Provider value={{ theme, settheme }}>
        {children}
    </ThemeContext.Provider>)
}

export default ThemeProvider