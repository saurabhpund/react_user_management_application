import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const DeleteUser = ({closeDeleteModal, users, setUsers, deletingUser}) => {
    const handleDelete = async () => {
        try {
          await axios.delete(`https://reqres.in/api/users/${deletingUser.id}`);
          setUsers(users.filter((user) => user.id !== deletingUser.id));
          toast.success("User deleted successfully");
          closeDeleteModal();
        } catch (error) {
          toast.error("Error deleting user");
          console.log(error)
        }
      };
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Delete User</h3>
            <h3 className="text-md font-normal mb-4">Are you sure you want to delete this user?</h3>
            <div className="flex justify-start">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDelete}>Delete</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default DeleteUser