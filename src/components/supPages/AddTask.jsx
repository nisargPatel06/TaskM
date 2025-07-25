import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios

// --- SVG Icons (to replace lucide-react) ---
const Plus = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const User = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const Clock = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const Send = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

// --- AddTaskModal Component ---
const AddTaskModal = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const [employees, setEmployees] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees for the dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoadingUsers(true);
      try {
        // NOTE: Using the user-provided endpoint for users.
        // This assumes the API returns a structure like { success: true, data: [...] }
        const res = await axios.get("http://localhost:5298/api/User");
        if (res.data && res.data.success) {
          // Filter for users with the role "Employee"
          const employeeList = res.data.tasks.filter(
            (user) => user.roleName === "Employee"
          );
          setEmployees(employeeList);
        } else {
          setError("Could not load employees.");
        }
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to fetch employees. Check console for details.");
      } finally {
        setIsLoadingUsers(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddingTask(true);
    setError(null);

    const taskData = {
      taskTitle: title,
      description: description,
      estimatedHrs: `${estimatedHours} HRS`,
      createdBy: 3, // Assuming a fixed creator ID as it's not available in the UI
      assignedTo: parseInt(assigneeId, 10),
    };

    try {
      // NOTE: Using a standard endpoint for adding a task.
      const response = await axios.post(
        "http://localhost:5298/api/Task/AddTask",
        taskData
      );
      if (response.data && response.data.success) {
        onTaskAdded(); // This will trigger a refetch in the parent
        onClose(); // Close the modal
      } else {
        setError(response.data.message || "An unknown error occurred.");
      }
    } catch (err) {
      console.error("Failed to add task:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to add task."
      );
    } finally {
      setIsAddingTask(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields from user's snippet */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="e.g., Implement new feature"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Provide a detailed description of the task..."
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="estimatedHours"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <Clock className="w-4 h-4 mr-1" />
                Estimated Hours
              </label>
              <input
                type="number"
                id="estimatedHours"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="e.g., 8"
                required
              />
            </div>
            <div>
              <label
                htmlFor="assignee"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <User className="w-4 h-4 mr-1" />
                Assign To
              </label>
              <select
                id="assignee"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                required
                disabled={isLoadingUsers}
              >
                <option value="">
                  {isLoadingUsers ? "Loading..." : "Select employee"}
                </option>
                {employees.map((emp) => (
                  <option key={emp.userId} value={emp.userId}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && (
            <div className="text-red-600 bg-red-50 p-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div>
            <button
              type="submit"
              disabled={isAddingTask}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingTask ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Create Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- AllTasks Component (Main Component) ---
const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extracted fetch logic to be reusable
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5298/api/Task/GetAllTasks"
      );
      if (response.data && response.data.success) {
        setTasks(response.data.data);
      } else {
        setError("Failed to fetch tasks: Invalid data format.");
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      console.error("API fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks(); // Refetch tasks when a new one is added
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const getAvatarColor = (id) =>
    [
      "bg-blue-600",
      "bg-green-600",
      "bg-purple-600",
      "bg-red-600",
      "bg-yellow-600",
      "bg-indigo-600",
    ][id % 6];

  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-700">
          Loading Tasks...
        </div>
      </div>
    );
  }

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
    <>
      <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            All Employee Tasks
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Task</span>
          </button>
        </div>
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
                  U
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
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onTaskAdded={handleTaskAdded}
        />
      )}
    </>
  );
};

export default AllTasks;
