import React from "react";
import { FiSearch, FiMic } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const tags = [
  "All",
  "Music",
  "Food",
  "MMA",
  "Drama",
  "Hip hop",
  "Art",
  "Drawing",
  "Fiction",
  "Comedy",
  "Drama",
  "Web Development",
  "Artificial Intelligence",
  "Random Stuff",
];

const Header = () => {
  return (
    <header className="flex flex-col mt-2 w-full bg-white">
      {/* Top bar */}
      <div className="flex items-center py-2 px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
            alt="YouTube"
            className="w-[150px] h-[40px]"
          />
        </div>

        {/* Search bar */}
        <div className="flex items-center flex-1 max-w-[800px] ml-[110px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full border rounded-l-full px-4 py-3 text-[16px] font-normal outline-none shadow-sm"
          />
          <button className="px-4 py-[13px] bg-gray-50 hover:bg-gray-200 border rounded-r-full">
            <FiSearch className="text-xl" />
          </button>
          <button className="ml-4 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-full">
            <FiMic className="text-xl" />
          </button>
        </div>

        {/* Sign-in */}
        <div className="ml-[250px]">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-blue-200">
            <FaUserCircle className="text-2xl text-blue-500" />
            <span className="text-base font-medium text-blue-600">Sign in</span>
          </button>
        </div>
      </div>

      {/* Tags row */}
      <div className="w-full overflow-x-auto no-scrollbar p-3">
        <div className="flex gap-4 px-4 py-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-100 whitespace-nowrap hover:bg-gray-300 rounded-lg text-[18px] font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
