import React from "react";

const mockTasks = [
  {
    id: 1,
    title: "Implement User Authentication",
    description:
      "Set up login functionality with JWT tokens and user role management.",
    status: "In Progress",
    priority: "High",
    due: "Today",
    assignee: "John Doe",
  },
  {
    id: 2,
    title: "Design Task Dashboard",
    description:
      "Create a dashboard for employees to view and manage their tasks.",
    status: "Pending",
    priority: "Medium",
    due: "Tomorrow",
    assignee: "Jane Smith",
  },
  {
    id: 3,
    title: "Setup Database Schema",
    description:
      "Design and implement the initial database schema for the project.",
    status: "Completed",
    priority: "High",
    due: "Yesterday",
    assignee: "Alice Brown",
  },
];

const statusColors = {
  "In Progress": "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

const AllTasks = () => {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        All Employee Tasks
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-200"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                {task.title}
                <span
                  className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                    statusColors[task.status]
                  }`}
                >
                  {task.status}
                </span>
              </h2>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
                  Priority: {task.priority}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                  Due: {task.due}
                </span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                {task.assignee[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900">{task.assignee}</p>
                <p className="text-xs text-gray-500">Assignee</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
