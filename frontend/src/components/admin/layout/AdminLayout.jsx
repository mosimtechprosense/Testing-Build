import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>  
  );
}
