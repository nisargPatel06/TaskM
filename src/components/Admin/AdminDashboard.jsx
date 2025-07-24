import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      // Ensure the auth token is available before making the request
      if (!auth.token) {
        setError("Authentication token not found. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        // Fetch users from the new secure endpoint
        const response = await fetch("http://localhost:5298/api/User", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Send the JWT token for authorization
          },
        });

        if (!response.ok) {
          // Handle non-successful responses (e.g., 401 Unauthorized, 403 Forbidden)
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch users: ${response.status} ${
              errorText || response.statusText
            }`
          );
        }

        const data = await response.json();
        setUsers(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [auth.token]); // Dependency array ensures this runs when the token is available

  // Display a loading message while fetching data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-8">
        Loading users...
      </div>
    );
  }

  // Display an error message if the fetch fails
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  // Render the table with the fetched user data
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50">
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {user.userId}
                  </p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {user.name}
                  </p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {user.email}
                  </p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">{user.roleName}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
