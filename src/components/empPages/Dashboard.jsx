import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Play,
  Square,
  User,
  TrendingUp,
  Copy,
  Plus,
  Search,
  Filter,
  Calendar,
  Edit,
  Trash2,
  PieChart,
  Activity,
  Target,
} from "lucide-react";

// Route Components
const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Tasks
              </p>
              <p className="text-3xl font-bold text-gray-900">24</p>
              <p className="text-sm text-green-600 mt-1">+2 from last week</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                In Progress
              </p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-500 mt-1">Active tasks</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Completed
              </p>
              <p className="text-3xl font-bold text-gray-900">16</p>
              <p className="text-sm text-green-600 mt-1">+3 today</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Today's Time
              </p>
              <p className="text-3xl font-bold text-gray-900">6h 45m</p>
              <p className="text-sm text-gray-500 mt-1">Tracked time</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time Tracker */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Time Tracker
              </h2>
            </div>
            <div className="text-center mb-6">
              <div className="text-5xl font-mono font-bold text-gray-900 mb-4">
                {currentTime}
              </div>
              <div className="flex justify-center space-x-4 mb-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                  <Square className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Click start to begin tracking
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Task completed
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Started time tracking
                  </p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
