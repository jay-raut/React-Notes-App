import { useState, useEffect, useContext } from "react";
import NotesList from "../components/NoteList";

export default function HomePage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:4000/note", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data && data.notesFileId && data.notesFileId.notes) {
        setNotes(data.notesFileId.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (noteText) => {
    const newNote = {
      content: noteText,
    };
    const response = await fetch("http://localhost:4000/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newNote),
    });

    if (response.ok) {
      console.log("ok");
      fetchNotes();
    } else {
      console.log("error");
    }
  };

  const deleteNote = async (noteId) => {
    const deleteNote = {
      noteId: noteId,
    };
    const response = await fetch("http://localhost:4000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(deleteNote),
    });
    if (response.ok){
      fetchNotes();
    }else{
      alert("Unable to delete note");
    }
  };

  return (
    <div className="container">
      <NotesList notes={notes} addNote={addNote} deleteNote={deleteNote} />
    </div>
  );
}
