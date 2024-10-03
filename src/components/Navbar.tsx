import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="navbar bg-base-100 px-4">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Complexity Game</a>
      </div>
      <div className="flex-none">
        <label className="flex items-center cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <input
            type="checkbox"
            className="toggle theme-controller"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 12.79A9 9 0 1 1 12.79 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </nav>
  );
}
