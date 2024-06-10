import Note from "./Note";
import AddNote from "./AddNote";
const NotesList = ({ notes, addNote, deleteNote }) => {
  return (
    <div className="notes-list">
      {notes.map((notes) => (
        <Note id={notes._id} text={notes.content} dateOfCreation={notes.createdAt} deleteNote={deleteNote}></Note>
      ))}
      <AddNote handleAddNote={addNote}></AddNote>
    </div>
  );
};

export default NotesList;
