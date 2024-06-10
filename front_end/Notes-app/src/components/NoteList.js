import Note from "./Note";
import AddNote from "./AddNote";
const NotesList = ({ notes }) => {
  const addNote = (noteText) => {
    const newNote = {
      content: noteText,
    };
    fetch("http://localhost:4000/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newNote),
    });
  };
  return (
    <div className="notes-list">
      {notes.map((notes) => (
        <Note id={notes._id} text={notes.content} dateOfCreation={notes.createdAt}></Note>
      ))}
      <AddNote handleAddNote={addNote}></AddNote>
    </div>
  );
};

export default NotesList;
