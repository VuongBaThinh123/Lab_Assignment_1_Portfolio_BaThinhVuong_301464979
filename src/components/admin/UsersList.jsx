import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.deleteUser(id);
      setUsers(prev => prev.filter(u => (u._id || u.id) !== id));
    } catch (err) {
      alert(err.message || "Failed to delete");
    }
  }

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin – Users</h2>
      <Link to="/admin/users/new">+ Add New User</Link>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id || u.id}>
                <td>{u.firstname}</td>
                <td>{u.lastname}</td>
                <td>{u.email}</td>
                <td>
                  <Link to={`/admin/users/${u._id || u.id}`}>Edit</Link>{" "}
                  |{" "}
                  <button type="button" onClick={() => handleDelete(u._id || u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersList;
