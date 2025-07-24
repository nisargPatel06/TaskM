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

const Reports = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Task Completion
              </p>
              <p className="text-xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Productivity</p>
              <p className="text-xl font-bold text-gray-900">92%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Goals Met</p>
              <p className="text-xl font-bold text-gray-900">12/15</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Time/Task
              </p>
              <p className="text-xl font-bold text-gray-900">2.5h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Weekly Performance
            </h2>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center text-gray-500">
              Performance Chart Placeholder
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Task Distribution
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Development
                </span>
                <span className="text-sm text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Design
                </span>
                <span className="text-sm text-gray-900">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Testing
                </span>
                <span className="text-sm text-gray-900">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
