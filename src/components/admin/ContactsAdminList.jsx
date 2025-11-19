import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

function ContactsAdminList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadContacts() {
    setLoading(true);
    setError("");
    try {
      const data = await api.getContacts();
      setContacts(data);
    } catch (err) {
      setError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this contact?")) return;
    try {
      await api.deleteContact(id);
      setContacts(prev => prev.filter(c => (c._id || c.id) !== id));
    } catch (err) {
      alert(err.message || "Failed to delete contact");
    }
  }

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin – Contacts</h2>
      <Link to="/admin/contacts/new">+ Add Contact</Link>

      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
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
            {contacts.map(c => (
              <tr key={c._id || c.id}>
                <td>{c.firstname}</td>
                <td>{c.lastname}</td>
                <td>{c.email}</td>
                <td>
                  <Link to={`/admin/contacts/${c._id || c.id}`}>Edit</Link>{" "}
                  |{" "}
                  <button type="button" onClick={() => handleDelete(c._id || c.id)}>
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

export default ContactsAdminList;
