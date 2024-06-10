import { useState, useEffect, useContext } from "react";
import NotesList from "../components/NoteList";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
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
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <NotesList notes={notes} />
    </div>
  );
}
