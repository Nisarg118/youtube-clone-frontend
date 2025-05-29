import { FiHome, FiUser, FiVideo, FiZap } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", icon: <FiHome />, path: "/" },
  { label: "Shorts", icon: <FiZap />, path: "/shorts" },
  { label: "Subscriptions", icon: <FiVideo />, path: "/subscriptions" },
  { label: "You", icon: <FiUser />, path: "/about" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="h-screen sticky top-0 sm:w-20 md:w-24 lg:w-28 px-2 py-4">
      <nav className="flex flex-col items-center gap-6 mt-8">
        {navItems.map(({ label, icon, path }) => (
          <SidebarItem
            key={label}
            label={label}
            icon={icon}
            isActive={location.pathname === path}
            onClick={() => navigate(path)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
