// src/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let msg = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.message) msg = data.message;
    } catch (e) {}
    throw new Error(msg);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // USERS
  getUsers: () => request("/api/users"),
  getUser: (id) => request(`/api/users/${id}`),
  createUser: (data) =>
    request("/api/users", { method: "POST", body: JSON.stringify(data) }),
  updateUser: (id, data) =>
    request(`/api/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteUser: (id) =>
    request(`/api/users/${id}`, { method: "DELETE" }),

  // PROJECTS
  getProjects: () => request("/api/projects"),
  getProject: (id) => request(`/api/projects/${id}`),
  createProject: (data) =>
    request("/api/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) =>
    request(`/api/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) =>
    request(`/api/projects/${id}`, { method: "DELETE" }),

  // SERVICES
  getServices: () => request("/api/services"),
  getService: (id) => request(`/api/services/${id}`),
  createService: (data) =>
    request("/api/services", { method: "POST", body: JSON.stringify(data) }),
  updateService: (id, data) =>
    request(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteService: (id) =>
    request(`/api/services/${id}`, { method: "DELETE" }),

  // CONTACTS
  getContacts: () => request("/api/contacts"),
  getContact: (id) => request(`/api/contacts/${id}`),
  createContact: (data) =>
    request("/api/contacts", { method: "POST", body: JSON.stringify(data) }),
  updateContact: (id, data) =>
    request(`/api/contacts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteContact: (id) =>
    request(`/api/contacts/${id}`, { method: "DELETE" }),
};
