import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Validate user credentials
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      onLogin(storedUser);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <a href="/register" className="text-blue-500">Register here</a>
      </p>
    </div>
  );
}

export default Login;
