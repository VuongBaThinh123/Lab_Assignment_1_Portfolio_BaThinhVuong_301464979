// frontend/src/components/Signup.jsx
import React, { useState } from 'react';
import api from '../api/client';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', form);
      // save token + user
      localStorage.setItem('token', res.data.token);
      if (res.data.user) localStorage.setItem('user', JSON.stringify(res.data.user));
      // navigate to home — simple redirect
      window.location.href = '/';
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      alert('Signup failed: ' + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>Sign up</h2>
      <label>
        Name
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      </label>
      <label>
        Email
        <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
      </label>
      <label>
        Password
        <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign Up'}</button>
    </form>
  );
}
