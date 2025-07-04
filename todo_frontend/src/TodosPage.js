import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// PUBLIC_INTERFACE
function TodosPage({ session }) {
  /**
   * Page for user's to-dos with CRUD operations.
   * session: { user: { id, email, ... } }
   */
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // New todo fields
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState('');

  const user = session?.user;

  // PUBLIC_INTERFACE
  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error) setTodos(data);
    else setError('Error loading todos');
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
    // Optionally: Setup realtime listener using Supabase channel
    // Not included for simplicity/minimal UI.
    // eslint-disable-next-line
  }, [user.id]);

  // PUBLIC_INTERFACE
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setError('');
    const { error } = await supabase
      .from('todos')
      .insert([{ title: newTitle, user_id: user.id, completed: false }]);
    if (error) setError(error.message);
    else {
      setNewTitle('');
      fetchTodos();
    }
  };

  // PUBLIC_INTERFACE
  const updateTodo = async (id) => {
    if (!editTitle.trim()) return;
    setError('');
    const { error } = await supabase
      .from('todos')
      .update({ title: editTitle })
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) setError(error.message);
    setEditId(null);
    setEditTitle('');
    fetchTodos();
  };

  // PUBLIC_INTERFACE
  const toggleComplete = async (id, completed) => {
    setError('');
    const { error } = await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) setError(error.message);
    fetchTodos();
  };

  // PUBLIC_INTERFACE
  const deleteTodo = async (id) => {
    setError('');
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);
    if (error) setError(error.message);
    fetchTodos();
  };

  return (
    <div className="container" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h2>My To-Dos</h2>
      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          className="input"
          type="text"
          placeholder="Add a new to-do..."
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          style={{ flex: 1 }}
        />
        <button className="btn" type="submit">Add</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : todos.length === 0 ? (
        <div>No to-dos yet.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo =>
            <li key={todo.id} style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-color)',
              padding: 8,
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.6 : 1,
            }}>
              <input
                type="checkbox"
                checked={!!todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                style={{ marginRight: 10 }}
              />
              {editId === todo.id ? (
                <>
                  <input
                    className="input"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    style={{ flex: 1, marginRight: 8 }}
                  />
                  <button className="btn" onClick={() => updateTodo(todo.id)} style={{ marginRight: 4 }}>Save</button>
                  <button className="btn-text" onClick={() => { setEditId(null); setEditTitle(''); }}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{todo.title}</span>
                  <button className="btn-text" onClick={() => { setEditId(todo.id); setEditTitle(todo.title); }} style={{ marginRight: 8 }}>Edit</button>
                  <button className="btn-text" onClick={() => deleteTodo(todo.id)} style={{ color: "#c00" }}>Delete</button>
                </>
              )}
            </li>
          )}
        </ul>
      )}
      {error && <div style={{ color: "#c00", marginTop: 8 }}>{error}</div>}
    </div>
  );
}

export default TodosPage;
