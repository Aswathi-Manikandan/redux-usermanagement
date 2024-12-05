import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  admindeleteUser,
  adminUpdateUser,
} from "../../redux/user/userSlice";

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/user/list");
      const data = await response.json();
      dispatch(setUsers(data));
      setFilteredUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      await fetch(`/api/admin/user/delete/${userToDelete._id}`, {
        method: "DELETE",
      });
      dispatch(admindeleteUser(userToDelete._id));
      setFilteredUsers((prev) => prev.filter((user) => user._id !== userToDelete._id));
      setShowConfirm(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({ username: user.username, email: user.email });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/user/update/${editingUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      dispatch(adminUpdateUser(updatedUser));
      setEditingUser(null);
      setEditForm({ username: "", email: "" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="p-5 min-h-screen bg-gradient-to-r  from-gray-600  to-blue-200 text-white mt-16">
      <h1 className="text-4xl font-bold text-center mb-6">User List</h1>
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="bg-white/30 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-200 text-white placeholder-gray-300"
        />
        <Link
          to="/admin/createUser"
          className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 shadow-lg transition"
        >
          Create New User
        </Link>
      </div>
      {filteredUsers.length === 0 && searchQuery && (
        <p className="text-red-400 text-center">No users found</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full bg-white/20 backdrop-blur-lg rounded-lg shadow-lg">
          <thead>
            <tr className="bg-white/30">
              <th className="p-4 text-left text-white">Profile Picture</th>
              <th className="p-4 text-left text-white">Name</th>
              <th className="p-4 text-left text-white">Email</th>
              <th className="p-4 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`hover:bg-teal-600/40 ${
                  index % 2 === 0 ? "bg-teal-700/20" : "bg-cyan-700/20"
                }`}
              >
                <td className="p-4">
                  <img
                    src={user.profilePicture}
                    alt={`${user.username}'s profile`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                  />
                </td>
                <td className="p-4">
                  {editingUser === user._id ? (
                    <input
                      value={editForm.username}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      className="bg-white/30 p-2 rounded border border-gray-400 text-white"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="p-4">
                  {editingUser === user._id ? (
                    <input
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="bg-white/30 p-2 rounded border border-gray-400 text-white"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-4">
                  {editingUser === user._id ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => confirmDelete(user)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-black">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete {userToDelete.username}?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
