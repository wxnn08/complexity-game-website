import React, { useState } from "react";
import SettingsModal from "./SettingsModal";
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      <nav className="navbar bg-base-100 px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">Big-O Battle</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <ul className="menu menu-horizontal p-0 space-x-4">
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === "/tutorial" ? "active" : ""}>
              <Link to="/tutorial">Tutorial</Link>
            </li>
            <li className={location.pathname === "/ranking" ? "active" : ""}>
              <Link to="/ranking">Ranking</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 flex justify-end">
          <button className="btn btn-square btn-ghost" onClick={toggleSettingsModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l6 6 6-6" />
            </svg>
          </button>
        </div>
      </nav>

      {isSettingsOpen && <SettingsModal onClose={toggleSettingsModal} />}
    </>
  );
}
