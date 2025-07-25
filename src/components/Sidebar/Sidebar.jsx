import React, { useContext } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  PlusSquare, // Import PlusSquare
} from "lucide-react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { auth, logout } = useContext(AuthContext);
  const roleId = Number(auth?.roleId);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "bg-blue-600 text-white rounded-lg px-3 py-2.5 flex items-center space-x-3 font-medium"
      : "text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2.5 flex items-center space-x-3";
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
                className={getLinkClass("/emp-dashboard")}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a href="/emp-tasks" className={getLinkClass("/emp-tasks")}>
                <CheckSquare className="w-5 h-5" />
                <span>Tasks</span>
              </a>
              <a
                href="/emp-time-tracking"
                className={getLinkClass("/emp-time-tracking")}
              >
                <Clock className="w-5 h-5" />
                <span>Time Tracking</span>
              </a>
              <a href="/emp-queries" className={getLinkClass("/emp-queries")}>
                <MessageSquare className="w-5 h-5" />
                <span>Queries</span>
              </a>
              <a href="/emp-reports" className={getLinkClass("/emp-reports")}>
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
                className={getLinkClass("/sup-all-tasks")}
              >
                <CheckSquare className="w-5 h-5" />
                <span>All Tasks</span>
              </a>
              <a
                href="/sup-all-queries"
                className={getLinkClass("/sup-all-queries")}
              >
                <MessageSquare className="w-5 h-5" />
                <span>All Queries</span>
              </a>
              <a href="/sup-add-task" className={getLinkClass("/sup-add-task")}>
                <PlusSquare className="w-5 h-5" />
                <span>Add Task</span>
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
          <a href="#" className={getLinkClass("/settings")}>
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
