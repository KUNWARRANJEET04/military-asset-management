import React, { useState } from 'react';
import '../styles/AuthPage.css';
import axios from 'axios';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // login | signup | forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'login') {
        const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        window.location.href = '/dashboard';
      } else if (mode === 'signup') {
        await axios.post('http://localhost:4000/api/auth/signup', { email, password, role });
        alert('Sign up successful! Please login.');
        setMode('login');
      } else {
        alert('Forgot password feature coming soon.');
      }
    } catch (err) {
      alert('Error: ' + err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Military Asset System</h2>
        <div className="tabs">
          <button onClick={() => setMode('login')} className={mode === 'login' ? 'active' : ''}>Login</button>
          <button onClick={() => setMode('signup')} className={mode === 'signup' ? 'active' : ''}>Sign Up</button>
          <button onClick={() => setMode('forgot')} className={mode === 'forgot' ? 'active' : ''}>Forgot Password</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
          {mode === 'signup' && (
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Admin">Admin</option>
              <option value="Commander">Commander</option>
              <option value="Operator">Operator</option>
            </select>
          )}
          <button type="submit">{mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
