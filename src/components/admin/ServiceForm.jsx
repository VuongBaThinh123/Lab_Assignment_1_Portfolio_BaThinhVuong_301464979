import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../../api";

function ServiceForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingService, setLoadingService] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadService() {
      if (!isEdit) return;
      setLoadingService(true);
      setError("");
      try {
        const s = await api.getService(id);
        setTitle(s.title || "");
        setDescription(s.description || "");
      } catch (err) {
        setError(err.message || "Failed to load service");
      } finally {
        setLoadingService(false);
      }
    }
    loadService();
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = { title, description };

    try {
      if (isEdit) {
        await api.updateService(id, data);
      } else {
        await api.createService(data);
      }
      navigate("/admin/services");
    } catch (err) {
      setError(err.message || "Failed to save service");
    } finally {
      setLoading(false);
    }
  }

  if (loadingService) return <p>Loading service...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "1rem auto" }}>
      <h2>{isEdit ? "Edit Service" : "New Service"}</h2>
      <Link to="/admin/services">← Back to Services</Link>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <div>
          <label>Title:</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default ServiceForm;
