import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() =>{
    document.title = "Login";
  },[]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/users"); // Redirect to Users List
    } catch (err) {
      setError("Invalid credentials. Try again.");
      console.log(err)
    }
  };
  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="w-1/2 hidden md:block">
        <img
          src={"https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"}
          alt="Login Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                {/* Eye Icon */}
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
