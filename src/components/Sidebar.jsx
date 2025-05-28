import { FiHome, FiUser, FiVideo, FiZap, FiMenu } from "react-icons/fi";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="sm:w-24 md:w-30 lg:w-30 flex-shrink-0   pt-4">
      <nav className="flex flex-col items-center gap-5 mt-10">
        <SidebarItem icon={<FiHome />} label="Home" />
        <SidebarItem icon={<FiZap />} label="Shorts" />
        <SidebarItem icon={<FiVideo />} label="Subscriptions" />
        <SidebarItem icon={<FiUser />} label="You" />
      </nav>
    </aside>
  );
};

export default Sidebar;
