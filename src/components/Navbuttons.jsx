import React from "react";
import { FiPlus } from "react-icons/fi";
import { FiBell } from "react-icons/fi";

const Navbuttons = () => {
  return (
    <div className="flex items-center gap-4 mr-10">
      {/* Create Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
        <FiPlus className="text-lg" />
        <span className="font-medium text-sm">Create</span>
      </button>

      {/* Notification Icon */}
      <button className="p-2 hover:bg-gray-100 rounded-full transition">
        <FiBell className="text-xl" />
      </button>

      {/* Avatar */}
      <button className="w-9 h-9 rounded-full overflow-hidden border border-gray-300">
        <img
          src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
          alt="User avatar"
          className="object-cover w-full h-full"
        />
      </button>
    </div>
  );
};

export default Navbuttons;
