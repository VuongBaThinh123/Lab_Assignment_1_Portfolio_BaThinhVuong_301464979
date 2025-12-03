// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

// Simple front-end only auth for Assignment 3.
// Credentials (fallback):
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

  // Helper: get all registered users from localStorage
  function getRegisteredUsers() {
    const stored = localStorage.getItem("registeredUsers");
    return stored ? JSON.parse(stored) : [];
  }

  // Helper: save a user to registered users list
  function saveRegisteredUser(email, password, name) {
    const users = getRegisteredUsers();
    const exists = users.find(u => u.email === email);
    if (!exists) {
      users.push({ email, password, name });
      localStorage.setItem("registeredUsers", JSON.stringify(users));
    }
  }

  // Try server login, fallback to hardcoded credentials and registered users.
  async function login(email, password) {
    // First try API
    try {
      const res = await api.post("/auth/signin", { email, password });
      const t = res?.data?.token;
      const u = res?.data?.user;
      if (t) {
        setToken(t);
        setUser(u || { email });
        return;
      }
    } catch (err) {
      // ignore and fallback below
    }

    // Fallback: simple local check
    await new Promise((r) => setTimeout(r, 200));
    
    // Check hardcoded admin
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      setToken("dummy-token");
      setUser({ email });
      return;
    }

    // Check registered users (from signup)
    const users = getRegisteredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setToken("dummy-token");
      setUser({ email: user.email, name: user.name });
      return;
    }

    throw new Error("Invalid email or password");
  }

  // Signup: try server, otherwise create a dummy account locally
  async function signup({ name, email, password }) {
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      const t = res?.data?.token;
      const u = res?.data?.user;
      if (t) {
        setToken(t);
        setUser(u || { name, email });
        return;
      }
    } catch (err) {
      // fallback
    }

    // Fallback: save to localStorage and create session
    await new Promise((r) => setTimeout(r, 200));
    saveRegisteredUser(email, password, name);
    setToken("dummy-token");
    setUser({ name, email });
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  const value = {
    token,
    user,
    login,
    signup,
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
