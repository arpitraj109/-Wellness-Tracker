import { useCallback, useEffect, useState } from "react";

export default function ThemeToggle() {
  // Get saved theme or system preference
  const getInitialTheme = useCallback(() => {
    if (typeof window === "undefined") return false; // SSR safety

    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  }, []);

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Update DOM and localStorage when darkMode changes
  useEffect(() => {
    const html = document.documentElement;
    
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      className="px-4 py-2 rounded-lg transition-colors duration-300
                 bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-white
                 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
