import IconButton from "@mui/material/IconButton";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useState } from "react";
import React from "react";
import { useContext } from "react";

const AddNote = ({ handleAddNote }) => {
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const saveClicked = () => {
    handleAddNote(text);
  };
  return (
    <div className="note new">
      <textarea rows="8" cols="10" placeholder="Type to create a new note..." className="new-note-textarea" onChange={handleChange}></textarea>
      <div className="new-note-footer">
        <small>{200 - text.length} characters remaining</small>
        <IconButton aria-label="save" color="inherit" sx={{ zIndex: 1000 }} onClick={() => saveClicked()}>
          <SaveRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default AddNote;
