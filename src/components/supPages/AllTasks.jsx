import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios

// Helper function to format the date strings
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to get a color based on the task ID for the avatar
const getAvatarColor = (id) => {
  const colors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-red-600",
    "bg-yellow-600",
    "bg-indigo-600",
  ];
  return colors[id % colors.length];
};

const AllTasks = () => {
  // State to hold tasks, loading status, and errors
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5298/api/Task/GetAllTasks"
        );
        if (response.data && response.data.success) {
          setTasks(response.data.data);
        } else {
          // Handle cases where the API returns success: false or unexpected structure
          setError("Failed to fetch tasks: Invalid data format.");
        }
      } catch (err) {
        // Handle network errors or other exceptions
        setError(`An error occurred: ${err.message}`);
        console.error("API fetch error:", err);
      } finally {
        // Set loading to false once the request is complete
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // The empty dependency array ensures this runs only once on mount

  // Display a loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-700">
          Loading Tasks...
        </div>
      </div>
    );
  }

  // Display an error message if the API call fails
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-red-600 bg-red-100 p-8 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        All Employee Tasks
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div
            key={task.taskId}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {task.taskTitle}
              </h2>
              <p className="text-gray-600 mb-4 h-20 overflow-y-auto">
                {task.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                  Est: {task.estimatedHrs}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  Created: {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 flex items-center mt-4">
              <div
                className={`w-10 h-10 ${getAvatarColor(
                  task.createdBy
                )} rounded-full flex items-center justify-center text-white font-bold text-lg mr-3`}
              >
                {/* Displaying 'U' for User as we only have an ID */}U
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  User ID: {task.createdBy}
                </p>
                <p className="text-xs text-gray-500">Created By</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
