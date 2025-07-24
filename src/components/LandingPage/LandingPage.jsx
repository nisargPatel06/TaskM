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
  Calendar,
  TrendingUp,
  Users,
  Copy,
} from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";

const LandingPage = () => {
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                Welcome back, John!
                <span className="ml-2">👋</span>
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your tasks today.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Tasks */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Tasks
                  </p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-green-600 mt-1">
                    +2 from last week
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-gray-900">1</p>
                  <p className="text-sm text-gray-500 mt-1">Active tasks</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-gray-900">1</p>
                  <p className="text-sm text-green-600 mt-1">+1 today</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Today's Time */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Today's Time
                  </p>
                  <p className="text-3xl font-bold text-gray-900">0h 0m</p>
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

                {/* Timer Display */}
                <div className="text-center mb-6">
                  <div className="text-5xl font-mono font-bold text-gray-900 mb-4">
                    00:00:00
                  </div>

                  {/* Control Buttons */}
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

            {/* Recent Tasks */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Tasks
                  </h2>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                      1 pending
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      1 active
                    </span>
                  </div>
                </div>

                {/* Task Item */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Implement User Authentication
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Set up login functionality with JWT tokens and user
                          role management.
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>John Doe</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>8h estimated</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                            high priority
                          </span>
                          <span className="text-sm text-gray-500">
                            Due: 1/30/2024
                          </span>
                        </div>
                      </div>

                      <div className="ml-4 flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            in progress
                          </span>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          Mark as Complete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Task */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="font-medium text-gray-700">
                      Design Task Dashboard
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
