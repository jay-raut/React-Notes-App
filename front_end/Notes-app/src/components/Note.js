import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export default function Note({ id, text, dateOfCreation }) {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>Created on: {dateOfCreation}</small>
        <IconButton aria-label="delete" color="inherit" sx={{ zIndex: 1000}} onClick={() => alert("Button clicked")}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
