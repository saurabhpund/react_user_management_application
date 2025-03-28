import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const EditUser = ({ formData, setFormData, closeEditModal}) => {
    const handleSave = async () => {
        try {
          await axios.put(`https://reqres.in/api/users/${editingUser.id}`, formData);
          setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user)));
          toast.success("User updated successfully");
          closeEditModal();
        } catch (error) {
          toast.error("Error updating user");
        }
      };
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
            <input
              type="email"
              className="border p-2 w-full mb-4"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="flex justify-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default EditUser