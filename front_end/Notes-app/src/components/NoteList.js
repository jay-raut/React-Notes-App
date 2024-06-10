import Note from "./Note";
import AddNote from "./AddNote";
const NotesList = ({ notes, addNote }) => {
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
