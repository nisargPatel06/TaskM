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

const Queries = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Queries</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Query</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Open Queries</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckSquare className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">28</p>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Queries
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              title: "Login Issues",
              status: "open",
              priority: "high",
              created: "2 hours ago",
            },
            {
              title: "Feature Request: Dark Mode",
              status: "in-progress",
              priority: "medium",
              created: "1 day ago",
            },
            {
              title: "Bug: Dashboard Loading",
              status: "resolved",
              priority: "high",
              created: "3 days ago",
            },
          ].map((query, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{query.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Created {query.created}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      query.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : query.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {query.status}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      query.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {query.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Queries;
