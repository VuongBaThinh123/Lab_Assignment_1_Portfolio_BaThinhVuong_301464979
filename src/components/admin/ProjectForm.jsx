import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../../api";

function ProjectForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [completion, setCompletion] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      if (!isEdit) return;
      setLoadingProject(true);
      setError("");
      try {
        const p = await api.getProject(id);
        setTitle(p.title || "");
        setDescription(p.description || "");
        setCompletion(
          p.completion ? new Date(p.completion).toISOString().slice(0, 10) : ""
        );
      } catch (err) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoadingProject(false);
      }
    }
    loadProject();
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = {
      title,
      description,
      completion: completion ? new Date(completion) : new Date(),
    };

    try {
      if (isEdit) {
        await api.updateProject(id, data);
      } else {
        await api.createProject(data);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  }

  if (loadingProject) return <p>Loading project...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "1rem auto" }}>
      <h2>{isEdit ? "Edit Project" : "New Project"}</h2>
      <Link to="/admin/projects">← Back to Projects</Link>
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
          <label>Completion date:</label>
          <input
            type="date"
            value={completion}
            onChange={e => setCompletion(e.target.value)}
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

export default ProjectForm;
