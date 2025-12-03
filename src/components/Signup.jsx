// frontend/src/components/Signup.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const formStyles = {
  container: {
    maxWidth: 420,
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#555',
    fontSize: '14px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
};

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
      // navigate to home — simple redirect
      window.location.href = '/';
    } catch (err) {
      const msg = err?.message || 'Unknown error';
      alert('Signup failed: ' + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={formStyles.container}>
      <h2 style={formStyles.heading}>Sign up</h2>
      
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Name</label>
        <input 
          style={formStyles.input}
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
        />
      </div>
      
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Email</label>
        <input 
          style={formStyles.input}
          type="email" 
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})} 
          required 
        />
      </div>
      
      <div style={formStyles.formGroup}>
        <label style={formStyles.label}>Password</label>
        <input 
          style={formStyles.input}
          type="password" 
          value={form.password} 
          onChange={e => setForm({...form, password: e.target.value})} 
          required 
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        style={{
          ...formStyles.button,
          ...(loading ? formStyles.buttonDisabled : {})
        }}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
