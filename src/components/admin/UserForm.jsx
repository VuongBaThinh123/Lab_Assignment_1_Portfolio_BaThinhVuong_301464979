import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../../api";

function UserForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // only used on create
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      if (!isEdit) return;
      setLoadingUser(true);
      setError("");
      try {
        const u = await api.getUser(id);
        setFirstname(u.firstname || "");
        setLastname(u.lastname || "");
        setEmail(u.email || "");
      } catch (err) {
        setError(err.message || "Failed to load user");
      } finally {
        setLoadingUser(false);
      }
    }
    loadUser();
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = { firstname, lastname, email };
    if (!isEdit && password) data.password = password;

    try {
      if (isEdit) {
        await api.updateUser(id, data);
      } else {
        await api.createUser(data);
      }
      navigate("/admin/users");
    } catch (err) {
      setError(err.message || "Failed to save user");
    } finally {
      setLoading(false);
    }
  }

  if (loadingUser) return <p>Loading user...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "1rem auto" }}>
      <h2>{isEdit ? "Edit User" : "New User"}</h2>
      <Link to="/admin/users">← Back to Users</Link>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <div>
          <label>First name:</label>
          <input
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last name:</label>
          <input
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>
        {!isEdit && (
          <div>
            <label>Password:</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
