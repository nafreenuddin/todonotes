import React, { useState, useEffect } from "react";
import axios from "axios";
import autosize from "autosize";
import "./App.css";
import Modal from './components/Modal';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [noteCount, setNoteCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    autosize(document.querySelectorAll("textarea"));
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/notes/get-note");
      setNotes(response.data);
      setNoteCount(response.data.length);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    if (!title && !body) {
      setError("Both title and body are required.");
      return;
    }
    if (!title) {
      setError("Title is required.");
      return;
    }
    if (!body) {
      setError("Body is required.");
      return;
    }
    if (title.length > 100) {
      setError("Title should not exceed 100 characters.");
      return;
    }
    if (body.length > 500) {
      setError("Body should not exceed 500 characters.");
      return;
    }

    try {
      const response = await axios.post("/api/notes/save-note", {
        title,
        body,
      });
      setNotes([response.data, ...notes]);
      setTitle("");
      setBody("");
      setError("");
      setNoteCount(noteCount + 1);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setNoteToDelete(id);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setNoteToDelete(null);
  };
  const handleConfirmDelete = async () => {
    if (noteToDelete) {
      try {
        await axios.delete(`/api/notes/delete-note/${noteToDelete}`);
        setNotes(notes.filter(note => note.id !== noteToDelete));
        setNoteCount(noteCount - 1);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
    handleCloseModal();
  };
  // const deleteNote = async (id) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this note?"
  //   );
  //   if (confirmed) {
  //     try {
  //       await axios.delete(`/api/notes/delete-note/${id}`);
  //       setNotes(notes.filter((note) => note.id !== id));
  //       setNoteCount(noteCount - 1);
  //     } catch (error) {
  //       console.error("Error deleting note:", error);
  //     }
  //   }
  // };

  // return (
  //   <div className="App">
  //     <h1>Welcome to Pages</h1>
  //     <textarea
  //       value={title}
  //       onChange={(e) => setTitle(e.target.value)}
  //       placeholder="Title"
  //     />
  //     <textarea
  //       value={body}
  //       onChange={(e) => setBody(e.target.value)}
  //       placeholder="Body"
  //     />
  //     <button onClick={addNote}>Add Note</button>
  //     {error && <p className="error">{error}</p>}
  //     <h2>My Notes: {noteCount}</h2>
  //     {notes.map((note) => (
  //       <div key={note.id} className="note">
  //         <h3>{note.title}</h3>
  //         <p>{note.body}</p>
  //         <button onClick={() => deleteNote(note.id)}>Delete</button>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className="App">
      <h1>Welcome to MyPages</h1>
      <textarea 
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea 
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Body"
      />
      <button onClick={addNote}>Add Note</button>
      {error && <p className="error">{error}</p>}
      <h2>My Notes: {noteCount}</h2>
      {notes.map(note => (
        <div key={note.id} className="note">
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <button onClick={() => handleDeleteClick(note.id)}>Delete</button>
        </div>
      ))}
      <Modal 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleConfirm={handleConfirmDelete} 
      />
    </div>
  );
}

export default App;
