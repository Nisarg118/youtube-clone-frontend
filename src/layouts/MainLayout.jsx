import { Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "../components";
import { Tags } from "../components";

function MainLayout() {
  const location = useLocation();
  const showTags = location.pathname === "/";
  return (
    <div className="h-screen flex flex-col">
      {/* Full-width Header */}
      <Header />

      {/* Row: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 overflow-y-auto">
          {showTags && <Tags />} <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
