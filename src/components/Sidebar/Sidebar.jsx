import React, { useContext } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { auth, logout } = useContext(AuthContext);
  const roleId = Number(auth?.roleId);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">PT</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">PropVivo</h1>
            <p className="text-sm text-gray-500">Task Management</p>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 py-6">
        <div className="px-6 mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </h3>
        </div>

        <nav className="px-3 space-y-1">
          {/* Employee menu: roleId === 3 */}
          {roleId === 3 && (
            <>
              <a
                href="/emp-dashboard"
                className="bg-blue-600 text-white rounded-lg px-3 py-2.5 flex items-center space-x-3 font-medium"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a
                href="/emp-tasks"
                className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2.5 flex items-center space-x-3"
              >
                <CheckSquare className="w-5 h-5" />
                <span>Tasks</span>
              </a>
              <a
                href="/emp-time-tracking"
                className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2.5 flex items-center space-x-3"
              >
                <Clock className="w-5 h-5" />
                <span>Time Tracking</span>
              </a>
              <a
                href="/emp-queries"
                className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2.5 flex items-center space-x-3"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Queries</span>
              </a>
              <a
                href="/emp-reports"
                className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2.5 flex items-center space-x-3"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Reports</span>
              </a>
            </>
          )}
          {/* Superior menu: roleId === 2 */}
          {roleId === 2 && (
            <>
              <a
                href="/sup-all-tasks"
                className="bg-blue-600 text-white rounded-lg px-3 py-2.5 flex items-center space-x-3 font-medium"
              >
                <CheckSquare className="w-5 h-5" />
                <span>All Tasks</span>
              </a>
              <a
                href="/sup-all-queries"
                className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2.5 flex items-center space-x-3"
              >
                <MessageSquare className="w-5 h-5" />
                <span>All Queries</span>
              </a>
            </>
          )}
        </nav>

        <div className="px-6 mt-8 mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            System
          </h3>
        </div>

        <nav className="px-3">
          <a
            href="#"
            className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2.5 flex items-center space-x-3"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {auth.name
                ? auth.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "U"}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{auth.name || "User"}</p>
            <p className="text-sm text-gray-500">
              {roleId === 3 ? "Employee" : roleId === 2 ? "Superior" : "User"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
