import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../../api";

function ContactForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingContact, setLoadingContact] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadContact() {
      if (!isEdit) return;
      setLoadingContact(true);
      setError("");
      try {
        const c = await api.getContact(id);
        setFirstname(c.firstname || "");
        setLastname(c.lastname || "");
        setEmail(c.email || "");
      } catch (err) {
        setError(err.message || "Failed to load contact");
      } finally {
        setLoadingContact(false);
      }
    }
    loadContact();
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = { firstname, lastname, email };

    try {
      if (isEdit) {
        await api.updateContact(id, data);
      } else {
        await api.createContact(data);
      }
      navigate("/admin/contacts");
    } catch (err) {
      setError(err.message || "Failed to save contact");
    } finally {
      setLoading(false);
    }
  }

  if (loadingContact) return <p>Loading contact...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "1rem auto" }}>
      <h2>{isEdit ? "Edit Contact" : "New Contact"}</h2>
      <Link to="/admin/contacts">← Back to Contacts</Link>
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
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
