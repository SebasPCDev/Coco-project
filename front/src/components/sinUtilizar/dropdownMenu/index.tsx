"use client";
// DropdownMenu.tsx
import React, { useState } from 'react';

interface DropdownMenuProps {
  title: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <button
          type="button"
          className="text-zinc-50 hover:text-zinc-50 hover:bg-zinc-900 px-4 py-3 rounded-md text-3xl font-semibold transition duration-300"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {title}
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Precios 1
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Precios 2
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;