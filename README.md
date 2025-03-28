# User Management System

A simple user management system built with **React.js** that allows users to view, search, paginate, edit, and delete users from a list. The project utilizes **ReqRes API** for mock user data and **Axios** for API requests.

## 🚀 Features

- **User List**: Fetch and display users from an API.
- **Search**: Filter users by first name, last name, or email.
- **Pagination**: Navigate through user pages.
- **Edit Users**: Update user details.
- **Delete Users**: Remove users with confirmation.
- **Modals**: Display modals for edit and delete actions.
- **Toast Notifications**: Show success and error messages.

## 🛠️ Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/saurabhpund/employee_management.git
   cd user-management
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Run the Development Server:**
   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173/`.

## 🔧 Usage

1. **View Users:** The homepage lists all users with pagination.
2. **Search Users:** Enter a name or email in the search bar to filter users.
3. **Edit User:** Click on the "Edit" button, modify user details, and save.
4. **Delete User:** Click "Delete", confirm in the modal, and remove the user.

## 🎨 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **State Management:** useState, useEffect
- **HTTP Requests:** Axios
- **Notifications:** React Toastify


