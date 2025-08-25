import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

export default function Navbar({ onLogout, onToggleSidebar }) {
  const [userLabel, setUserLabel] = useState("");

  useEffect(() => {
    try {
      const username = localStorage.getItem("username") || localStorage.getItem("user");
      const email = localStorage.getItem("userEmail");
      const label = username || (email ? email.split("@")[0] : "");
      if (label) setUserLabel(label);
    } catch {}
  }, []);
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto w-full px-6 py-4 grid grid-cols-3 items-center">
        <div className="flex items-center">
          {onToggleSidebar ? (
            <button
              onClick={onToggleSidebar}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
            </button>
          ) : (
            <span className="w-10 h-10"></span>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wellness Tracker</h1>
        </div>
        <div className="flex items-center justify-end gap-3">
          {userLabel && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-semibold">
                {userLabel.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-medium hidden sm:block">{userLabel}</span>
            </div>
          )}
          <ThemeToggle />
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
