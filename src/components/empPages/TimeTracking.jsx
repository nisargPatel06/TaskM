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

const TimeTracking = () => {
  return (
    <div>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Time Tracking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Today</p>
                <p className="text-2xl font-bold text-gray-900">8h 15m</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div ClassName="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">This Week</p>
                <p className="text-2xl font-bold text-gray-900">42h 30m</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Average/Day</p>
                <p className="text-2xl font-bold text-gray-900">7h 45m</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Time Entries
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              {
                task: "User Authentication",
                duration: "2h 30m",
                date: "Today, 9:00 AM",
              },
              {
                task: "Database Setup",
                duration: "1h 45m",
                date: "Today, 2:00 PM",
              },
              {
                task: "API Development",
                duration: "3h 15m",
                date: "Yesterday, 10:00 AM",
              },
            ].map((entry, index) => (
              <div
                key={index}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-900">{entry.task}</p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{entry.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;
