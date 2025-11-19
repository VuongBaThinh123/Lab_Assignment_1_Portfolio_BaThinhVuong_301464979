import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

function ProjectsAdminList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    setLoading(true);
    setError("");
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => (p._id || p.id) !== id));
    } catch (err) {
      alert(err.message || "Failed to delete project");
    }
  }

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin – Projects</h2>
      <Link to="/admin/projects/new">+ Add New Project</Link>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Completion</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p._id || p.id}>
                <td>{p.title}</td>
                <td>{p.completion ? new Date(p.completion).toLocaleDateString() : ""}</td>
                <td>{p.description}</td>
                <td>
                  <Link to={`/admin/projects/${p._id || p.id}`}>Edit</Link>{" "}
                  |{" "}
                  <button type="button" onClick={() => handleDelete(p._id || p.id)}>
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

export default ProjectsAdminList;
