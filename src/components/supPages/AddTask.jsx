import React, { useState } from "react";
import { Plus, Send, User, Clock } from "lucide-react";
import { useGetUnassignedEmployeesQuery } from "../../redux/api/userAPI";
import { useAddTaskMutation } from "../../redux/api/taskAPI";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  // Use the new hook to get unassigned employees
  const { data: unassignedEmployees, isLoading: isLoadingUsers } =
    useGetUnassignedEmployeesQuery();
  const [addTask, { isLoading: isAddingTask, isSuccess, isError }] =
    useAddTaskMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({
        taskTitle: title,
        description,
        estimatedHrs: estimatedHours,
        assignedToUserId: parseInt(assigneeId, 10),
      }).unwrap();

      // Reset form on success
      setTitle("");
      setDescription("");
      setEstimatedHours("");
      setAssigneeId("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Task</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Clock className="w-4 h-4 inline-block mr-1" />
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
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <User className="w-4 h-4 inline-block mr-1" />
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
                    {isLoadingUsers
                      ? "Loading employees..."
                      : "Select an available employee"}
                  </option>
                  {/* Populate dropdown with only unassigned employees */}
                  {unassignedEmployees?.map((emp) => (
                    <option key={emp.userId} value={emp.userId}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isAddingTask}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isAddingTask ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Adding Task...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Create and Assign Task</span>
                  </>
                )}
              </button>
            </div>
            {isSuccess && (
              <div className="text-green-600 bg-green-50 p-3 rounded-lg text-center">
                Task added successfully!
              </div>
            )}
            {isError && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg text-center">
                Failed to add task. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
