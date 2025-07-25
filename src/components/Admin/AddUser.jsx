import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onClose, onUserAdded }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "2" });
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    setLoading(true);
    let roleId = parseInt(newUser.role, 10);
    const userToSend = {
      userId: 0,
      roleId: roleId,
      email: newUser.email,
      name: newUser.name,
      password: "default123",
    };

    try {
      const response = await axios.post(
        "http://localhost:5298/api/User/AddUser",
        userToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      onUserAdded(response.data);
      setNewUser({ name: "", email: "", role: "2" });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New User</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
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
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            >
              <option value="2">Employee</option>
              <option value="3">Superior</option>
            </select>
          </div>
          <div className="pt-2">
            <button
              onClick={handleAddUser}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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

export default AddUser;
