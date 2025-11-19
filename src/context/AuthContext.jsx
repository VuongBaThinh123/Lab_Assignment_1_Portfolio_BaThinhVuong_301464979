// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

// Simple front-end only auth for Assignment 3.
// Credentials:
//   Email:    admin@example.com
//   Password: admin123
const HARDCODED_EMAIL = "admin@example.com";
const HARDCODED_PASSWORD = "admin123";

// Create the context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  // Keep token in localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Keep user in localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  async function login(email, password) {
    // fake delay just to look async
    await new Promise((r) => setTimeout(r, 200));

    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      setToken("dummy-token");
      setUser({ email });
    } else {
      throw new Error("Invalid email or password");
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
