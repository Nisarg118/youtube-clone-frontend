import React from "react";
import { FiMenu, FiSearch, FiMic } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <FiMenu className="text-xl" />
        <img
          src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
          alt="YouTube"
          className="h-5"
        />
      </div>

      {/* Middle: Search bar */}
      <div className="flex items-center gap-2 flex-1 max-w-2xl mx-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full border rounded-l-full px-4 py-1 outline-none"
        />
        <button className="px-4 py-1 bg-gray-100 border rounded-r-full">
          <FiSearch />
        </button>
        <button className="ml-2 p-2 bg-gray-100 rounded-full">
          <FiMic />
        </button>
      </div>

      {/* Right: Icons */}
      <div>
        <button className="flex items-center gap-2 px-4 py-1 border rounded-full">
          <FaUserCircle className="text-xl" />
          <span className="text-sm">Sign in</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
