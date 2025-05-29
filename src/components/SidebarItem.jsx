const SidebarItem = ({ icon, label, onClick, isActive }) => {
  return (
    <div
      className={`flex flex-col items-center text-center cursor-pointer rounded-lg h-[70px] w-[70px] p-2 ${
        isActive ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
      title={label}
    >
      <div className="text-3xl">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export default SidebarItem;
