import React, { useState } from "react";
import SettingsModal from "./SettingsModal";

export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      <nav className="navbar bg-base-100 px-4">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Big-O Battle</a>
        </div>
        <div className="flex-none">
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
