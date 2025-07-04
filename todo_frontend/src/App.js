import React, { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './AuthForm';
import TodosPage from './TodosPage';
import { supabase } from './supabaseClient';

// PUBLIC_INTERFACE
function App() {
  /**
   * App root. Handles global theme, auth state, and routing.
   */
  const [theme, setTheme] = useState('light');
  const [session, setSession] = useState(null);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // TRACK Auth status on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      if (listener && listener.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleAuth = (session) => setSession(session);
  // PUBLIC_INTERFACE
  const handleLogout = () => setSession(null);

  return (
    <div className="App">
      <header className="App-header" style={{ paddingBottom: 0 }}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <h1 style={{ fontWeight: 700, margin: '32px 0 8px 0', fontSize: '2rem' }}>Minimal To-Do App</h1>
        <div style={{ marginBottom: 24, fontSize: 18, color: "var(--text-secondary)" }}>Built with React + Supabase</div>
        <AuthForm onAuth={handleAuth} onLogout={handleLogout} session={session} />
        {session &&
          <TodosPage session={session} />}
      </header>
    </div>
  );
}

export default App;
