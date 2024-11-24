import React, { useState } from "react";
import SettingsModal from "./SettingsModal";
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleLinkClick = () => {
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();
  };

  return (
    <>
      <nav className="navbar bg-base-100 px-4 relative z-10">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">Big-O Battle</Link>
        </div>
        <div className="flex-none lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
              <li className={location.pathname === "/" ? "active" : ""}>
                <Link to="/" onClick={handleLinkClick}>Jogar</Link>
              </li>
              <li className={location.pathname === "/tutorial" ? "active" : ""}>
                <Link to="/tutorial" onClick={handleLinkClick}>Tutorial</Link>
              </li>
              <li className={location.pathname === "/ranking" ? "active" : ""}>
                <Link to="/ranking" onClick={handleLinkClick}>Ranking</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal p-0 space-x-4">
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Jogar</Link>
            </li>
            <li className={location.pathname === "/tutorial" ? "active" : ""}>
              <Link to="/tutorial">Tutorial</Link>
            </li>
            <li className={location.pathname === "/ranking" ? "active" : ""}>
              <Link to="/ranking">Ranking</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={toggleSettingsModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
          </button>
        </div>
      </nav>

      {isSettingsOpen && <SettingsModal onClose={toggleSettingsModal} />}
    </>
  );
}
