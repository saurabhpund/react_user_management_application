import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "../components/EditUser";
import DeleteUser from "../components/DeleteUser";
import { FiSearch } from "react-icons/fi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      toast.error("Error fetching users");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!filterText.trim()) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          [user.first_name, user.last_name, user.email].some((field) =>
            field.toLowerCase().includes(filterText.toLowerCase())
          )
        )
      );
    }
  }, [filterText, users]);

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const closeEditModal = () => setEditingUser(null);
  const openDeleteModal = (user) => setDeletingUser(user);
  const closeDeleteModal = () => setDeletingUser(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">User List</h2>
      <div className="w-1/3 border mb-3 flex items-center p-3">
        <input
          type="text"
          className="border p-2 w-full outline-none border-none"
          placeholder="Search by name, email..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <FiSearch className="w-6 h-6 ml-2 text-gray-500" />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-violet-500 text-white">
                <th className="py-2 px-4">Avatar</th>
                <th className="py-2 px-4">First Name</th>
                <th className="py-2 px-4">Last Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="py-2 px-4 flex justify-center">
                      <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="py-2 px-4 text-center">{user.first_name}</td>
                    <td className="py-2 px-4 text-center">{user.last_name}</td>
                    <td className="py-2 px-4 text-center">{user.email}</td>
                    <td className="py-2 px-4 flex justify-center">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => openEditModal(user)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => openDeleteModal(user)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center mt-6">
            <button className={`px-4 py-2 bg-gray-300 rounded-lg mr-2 ${page === 1 && "opacity-50 cursor-not-allowed"}`} onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-200 rounded-lg">Page {page} of {totalPages}</span>
            <button className={`px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 ${page === totalPages && "opacity-50 cursor-not-allowed"}`} onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}

      {editingUser && <EditUser formData={formData} setFormData={setFormData} closeEditModal={closeEditModal} />}
      {deletingUser && <DeleteUser closeDeleteModal={closeDeleteModal} users={users} setUsers={setUsers} deletingUser={deletingUser} />}
    </div>
  );
};

export default UserList;
