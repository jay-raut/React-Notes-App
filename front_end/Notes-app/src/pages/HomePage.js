import { useState, useEffect, useContext } from "react";
import NotesList from "../components/NoteList";
import { UserContext } from "../UserContext";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import "../App.css";
export default function HomePage() {
  const [notes, setNotes] = useState([]);

  const { setUserInfo, userInfo } = useContext(UserContext);

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
    <div className="container">
      {username && <NotesList notes={notes} addNote={addNote} deleteNote={deleteNote} />}
      {!username && (
        <>
          <div className="splash-page">
            <h1>Welcome to Notes </h1>
            <p>All your notes - in the cloud.</p>
            <p>To get started. Log in or register</p>
            <div className="note-example">
              <span>This is an example note. Create more like this by getting started</span>
              <div className="note-footer">
                <small>Created on: {new Date().toString()}</small>
                <IconButton aria-label="delete" color="inherit" sx={{ zIndex: 1000 }}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
