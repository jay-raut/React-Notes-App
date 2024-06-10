import { useState, useEffect, useContext } from "react";
import NotesList from "../components/NoteList";
import { UserContext } from "../UserContext";
import "../App.css";
export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  useEffect(() => {
    if (username) {
      fetchNotes();
    }
  }, [username]);

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
    if (response.ok) {
      fetchNotes();
    } else {
      alert("Unable to delete note");
    }
  };
  return (
    <>
      {!username && (
        <>
          <div className="notes-page-not-signed-in">
            <h1>Log in to view or create your notes</h1>
          </div>
        </>
      )}
      {username && (
        <>
          <div className="container">
            <NotesList notes={notes} addNote={addNote} deleteNote={deleteNote} />
          </div>
        </>
      )}
    </>
  );
}
