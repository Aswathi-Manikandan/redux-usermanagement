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

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/user/delete/${id}`, { method: "DELETE" });
      dispatch(admindeleteUser(id));
      setFilteredUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({ username: user.username, email: user.email });
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevents page reload
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
    <div className="p-5 max-w-4xl mx-auto my-4">
      <h1 className="text-2xl font-semibold text-center">User List</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="border p-2 rounded w-auto"
        />
        <Link
          to="/admin/createUser"
          className="bg-blue-500 text-white p-2 rounded ml-auto"
        >
          Create New User
        </Link>
      </div>
      {filteredUsers.length === 0 && searchQuery && (
        <p className="text-red-500 text-center">No users found</p>
      )}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="border p-3">Profile Picture</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="border p-3">
                <img
                  src={user.profilePicture}
                  alt={`${user.username}'s profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="border p-3">
                {editingUser === user._id ? (
                  <input
                    value={editForm.username}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border p-3">
                {editingUser === user._id ? (
                  <input
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border p-3">
                {editingUser === user._id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white p-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white p-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white p-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;










