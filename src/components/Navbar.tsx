import React, { useState, useEffect } from "react";

const themes = ["emerald", "dark", "light"];

export default function Navbar() {
  const [theme, setTheme] = useState("emerald");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "emerald";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="navbar bg-base-100 px-4">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Big-O Battle</a>
      </div>
      <div className="flex-none">
        <select
          className="select select-bordered"
          value={theme}
          onChange={handleThemeChange}
        >
          {themes.map((th) => (
            <option key={th} value={th}>
              {th.charAt(0).toUpperCase() + th.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
