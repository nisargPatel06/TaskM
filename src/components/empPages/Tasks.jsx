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

const Tasks = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {[
            {
              title: "Implement User Authentication",
              status: "in-progress",
              priority: "high",
              due: "Today",
            },
            {
              title: "Design Task Dashboard",
              status: "pending",
              priority: "medium",
              due: "Tomorrow",
            },
            {
              title: "Setup Database Schema",
              status: "completed",
              priority: "high",
              due: "Yesterday",
            },
            {
              title: "Write API Documentation",
              status: "pending",
              priority: "low",
              due: "Next Week",
            },
          ].map((task, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.status}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "medium"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-sm text-gray-500">
                      Due: {task.due}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
