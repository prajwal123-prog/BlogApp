import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the user data object
    const userData = { username, password };

    // Store the user credentials in localStorage (mock database)
    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect to login page after successful registration
    navigate("/login");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
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
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <a href="/login" className="text-blue-500">Login here</a>
      </p>
    </div>
  );
}

export default Register;
