import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <HomePage user={user} onLogout={handleLogout} />
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/"
              element={<Login onLogin={handleLogin} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
