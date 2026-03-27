import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";


export default function AdminLayout() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6 bg-gray-100 flex-1">
          <Outlet />
        </div>

      </div>
    </div>
  );
}