import React, { useState } from "react";
import { useGetAllUsersQuery } from "../../redux/api/userAPI"; // Restored original import
import axios from "axios"; // Restored original import

// Note: The two components are in one file for this example.
// In your project, they would be in their respective files.

// Component: AddUser (e.g., in AddUser.js)
const AddUser = ({ onClose, onUserAdded }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "2" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      setError("Name and Email are required.");
      return;
    }
    setLoading(true);
    setError("");
    let roleId = parseInt(newUser.role, 10);
    const userToSend = {
      userId: 0,
      roleId: roleId,
      email: newUser.email,
      name: newUser.name,
      password: "default123", // Note: Sending passwords in plaintext is insecure
    };

    try {
      // Using the actual axios post call to your API
      const response = await axios.post(
        "http://localhost:5298/api/User/AddUser",
        userToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // This prop call is what triggers the refetch in the parent component
      onUserAdded(response.data);
      setNewUser({ name: "", email: "", role: "2" });
      onClose();
    } catch (error) {
      console.error("Failed to add user:", error);
      setError("Failed to add user. Please check the console and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative transform transition-all scale-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., john.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="2">Employee</option>
              <option value="3">Superior</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="pt-4">
            <button
              onClick={handleAddUser}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component: AdminDashboard (e.g., in AdminDashboard.js)
const AdminDashboard = () => {
  // Using the actual RTK Query hook, which provides the refetch function
  const { data: users, error, isLoading, refetch } = useGetAllUsersQuery();
  const [showAddModal, setShowAddModal] = useState(false);

  if (isLoading && !users) {
    return (
      <div className="flex justify-center items-center h-screen p-8 bg-gray-50">
        <div className="text-lg font-semibold text-gray-600">
          Loading users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error: {error.data?.message || error.message || "Failed to fetch users"}
      </div>
    );
  }

  // This handler is called from the AddUser modal on a successful submission.
  // It calls the `refetch` function from the useGetAllUsersQuery hook.
  const handleUserAdded = () => {
    console.log("A new user was added, triggering refetch.");
    refetch();
  };

  const getRoleClass = (roleName) => {
    switch (roleName?.toLowerCase()) {
      case "superior":
        return "bg-blue-200 text-blue-900";
      case "employee":
        return "bg-green-200 text-green-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add User
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-100">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr
                    key={user.userId}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="px-5 py-4 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.userId}
                      </p>
                    </td>
                    <td className="px-5 py-4 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.name}
                      </p>
                    </td>
                    <td className="px-5 py-4 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-4 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${getRoleClass(
                          user.roleName
                        )}`}
                      >
                        <span className="relative">{user.roleName}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddModal && (
          <AddUser
            onClose={() => setShowAddModal(false)}
            onUserAdded={handleUserAdded}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
