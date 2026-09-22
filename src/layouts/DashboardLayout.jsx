import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="min-h-screen bg-[#F5F7FA]">
      {}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {}
      <div className="min-h-screen flex flex-col min-w-0 min-[768px]:ml-[230px] min-[1025px]:ml-[250px]">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-w-0 px-[25px] pt-5 pb-6 min-[1025px]:px-10 min-[1025px]:pt-6">
          <Outlet />
        </main>
      </div>
    </div>;
}
export default DashboardLayout;
