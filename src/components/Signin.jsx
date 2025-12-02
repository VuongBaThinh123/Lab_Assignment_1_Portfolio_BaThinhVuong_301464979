// frontend/src/components/Signin.jsx
import React, { useState } from 'react';
import api from '../api/client';

export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/signin', form);
      localStorage.setItem('token', res.data.token);
      if (res.data.user) localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/';
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      alert('Signin failed: ' + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>Sign in</h2>
      <label>
        Email
        <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
      </label>
      <label>
        Password
        <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign In'}</button>
    </form>
  );
}
