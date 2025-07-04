import React, { useState } from 'react';
import { supabase } from './supabaseClient';

// PUBLIC_INTERFACE
function AuthForm({ onAuth, onLogout, session }) {
  /**
   * Form for login/register and logout.
   */
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth(data.session); // callback to App
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setIsLogin(true);
        setError("Registration successful. Please log in.");
      }
    } catch (err) {
      setError(err.message || 'Auth error');
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  if (session) {
    return (
      <div style={{ marginBottom: 24 }}>
        <div>Signed in as: {session.user.email}</div>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <form className="container" onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
      <h2 style={{ margin: 0 }}>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoComplete="username"
        style={{ marginBottom: 8, width: "100%" }}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        autoComplete={isLogin ? "current-password" : "new-password"}
        style={{ marginBottom: 8, width: "100%" }}
      />
      <button className="btn" type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
      </button>
      {error && <div style={{ color: "#c00", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 8 }}>
        <span>
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <button type="button" className="btn-text" style={{ background: "none", border: 0, color: "#1976d2", cursor: "pointer", padding: 0, font: "inherit" }}
            onClick={() => setIsLogin(v => !v)}>
            {isLogin ? "Register" : "Login"}
          </button>
        </span>
      </div>
    </form>
  );
}

export default AuthForm;
