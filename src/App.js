import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);

  // CORRECTION URL : ageqacf (et non aqegacf)
  const API_URL = "https://note-api-lina-ageqacf0dfh2c5ex.swedencentral-01.azurewebsites.net/api/notes";

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Erreur chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ text: newNote }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const createdNote = await response.json();
        setNotes([...notes, createdNote]);
        setNewNote("");
      }
    } catch (err) {
      alert("Erreur de connexion");
    }
  };

  const updateNote = async (id) => {
    if (!editingText.trim()) return;
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        body: JSON.stringify({ id, text: editingText }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const updatedNote = await response.json();
        setNotes(notes.map(n => n.id === id ? updatedNote : n));
        setEditingId(null);
        setEditingText("");
      }
    } catch (err) {
      alert("Erreur de connexion");
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Supprimer cette note ?")) return;
    try {
      const response = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setNotes(notes.filter(n => n.id !== id));
      }
    } catch (err) {
      alert("Erreur de connexion");
    }
  };

  // AFFICHAGE PENDANT LE CHARGEMENT (CORRIGÉ)
  if (loading) {
    return (
      <div className="App">
        <div className="loader-container">
          <h1>📓 Mes Notes </h1>
          <p>Connexion à Azure en cours...</p>
        </div>
      </div>
    );
  }

  // AFFICHAGE PRINCIPAL (SORTI DU BLOC LOADING)
  return (
    <div className="App">
      <h1>📓 Mes Notes lina</h1>
      
      <div className="add-section">
        <input 
          className="input-note"
          value={newNote} 
          onChange={(e) => setNewNote(e.target.value)} 
          placeholder="Ajouter une note importante..." 
          onKeyPress={(e) => e.key === 'Enter' && addNote()}
        />
        <button className="btn-add" onClick={addNote}>➕ Ajouter</button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Aucune note trouvée. Lancez-vous ! ✨</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              {editingId === note.id ? (
                <>
                  <input 
                    className="input-note"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    autoFocus
                  />
                  <div className="btn-group">
                    <button className="btn-add" style={{background: '#2ecc71'}} onClick={() => updateNote(note.id)}>✓</button>
                    <button className="btn-delete" onClick={() => setEditingId(null)}>✕</button>
                  </div>
                </>
              ) : (
                <>
                  <span className="note-text">{note.text}</span>
                  <div className="btn-group">
                    <button className="btn-edit" onClick={() => { setEditingId(note.id); setEditingText(note.text); }}>✏️</button>
                    <button className="btn-delete" onClick={() => deleteNote(note.id)}>🗑️</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  ); 
}

export default App;