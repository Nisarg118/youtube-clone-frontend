import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "../components";
import { Tags } from "../components";

function MainLayout() {
  const location = useLocation();
  const showTags = location.pathname === "/";
  const showSidebar = !location.pathname.startsWith("/watch");
  return (
    <div className="h-screen flex flex-col">
      {/* Full-width Header */}
      <Header />

      {/* Row: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {showSidebar ? (
          <Sidebar />
        ) : (
          <div className="sm:w-24 md:w-30 lg:w-30" />
        )}
        <main className="flex-1 p-4 overflow-y-auto">
          {showTags && <Tags />} <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
