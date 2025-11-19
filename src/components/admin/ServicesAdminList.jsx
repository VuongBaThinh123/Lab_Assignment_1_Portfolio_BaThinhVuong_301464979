import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

function ServicesAdminList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadServices() {
    setLoading(true);
    setError("");
    try {
      const data = await api.getServices();
      setServices(data);
    } catch (err) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.deleteService(id);
      setServices(prev => prev.filter(s => (s._id || s.id) !== id));
    } catch (err) {
      alert(err.message || "Failed to delete service");
    }
  }

  if (loading) return <p>Loading services...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin – Services</h2>
      <Link to="/admin/services/new">+ Add New Service</Link>

      {services.length === 0 ? (
        <p>No services.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s._id || s.id}>
                <td>{s.title}</td>
                <td>{s.description}</td>
                <td>
                  <Link to={`/admin/services/${s._id || s.id}`}>Edit</Link>{" "}
                  |{" "}
                  <button type="button" onClick={() => handleDelete(s._id || s.id)}>
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

export default ServicesAdminList;
