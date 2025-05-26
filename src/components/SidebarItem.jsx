import React from "react";

const SidebarItem = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center text-center cursor-pointer">
      <div className="text-3xl">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export default SidebarItem;
