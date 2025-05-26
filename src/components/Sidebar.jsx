import React from "react";
import { FiHome, FiClock, FiUser, FiVideo, FiZap } from "react-icons/fi";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="w-20 sm:w-24 md:w-32 lg:w-40 flex-shrink-0 border-r pt-4">
      <nav className="flex flex-col items-center gap-6">
        <SidebarItem icon={<FiHome />} label="Home" />
        <SidebarItem icon={<FiZap />} label="Shorts" />
        <SidebarItem icon={<FiVideo />} label="Subscriptions" />
        <SidebarItem icon={<FiUser />} label="You" />
        <SidebarItem icon={<FiClock />} label="History" />
      </nav>
    </aside>
  );
};

export default Sidebar;
