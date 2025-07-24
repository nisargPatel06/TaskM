import React from "react";

const mockQueries = [
  {
    id: 1,
    title: "Login Issues",
    description: "Employee unable to login with correct credentials.",
    status: "Open",
    priority: "High",
    created: "2 hours ago",
    raisedBy: "John Doe",
  },
  {
    id: 2,
    title: "Feature Request: Dark Mode",
    description: "Request to add dark mode to the dashboard.",
    status: "In Progress",
    priority: "Medium",
    created: "1 day ago",
    raisedBy: "Jane Smith",
  },
  {
    id: 3,
    title: "Bug: Dashboard Loading",
    description: "Dashboard takes too long to load for some users.",
    status: "Resolved",
    priority: "High",
    created: "3 days ago",
    raisedBy: "Alice Brown",
  },
];

const statusColors = {
  Open: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
};

const AllQueries = () => {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        All Employee Queries
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockQueries.map((query) => (
          <div
            key={query.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-200"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                {query.title}
                <span
                  className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                    statusColors[query.status]
                  }`}
                >
                  {query.status}
                </span>
              </h2>
              <p className="text-gray-600 mb-4">{query.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
                  Priority: {query.priority}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                  Created: {query.created}
                </span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                {query.raisedBy[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900">{query.raisedBy}</p>
                <p className="text-xs text-gray-500">Raised By</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQueries;
