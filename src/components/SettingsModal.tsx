import React, { useContext } from 'react';
import { FontSizeContext } from '../contexts/FontSizeContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const { increaseFont, decreaseFont } = useContext(FontSizeContext);
  const { theme, setTheme, themes } = useContext(ThemeContext);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Configurações</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Tamanho da fonte do código</span>
            <div className="flex space-x-2">
              <button className="btn btn-sm btn-secondary" onClick={decreaseFont}>
                A−
              </button>
              <button className="btn btn-sm btn-secondary" onClick={increaseFont}>
                A+
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Tema</span>
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
        </div>
      </div>
    </div>
  );
}
