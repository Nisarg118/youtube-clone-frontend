import React from "react";

export default function Searchbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="flex justify-center items-center h-16 px-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>
    </div>
  );
}
