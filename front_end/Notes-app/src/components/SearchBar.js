import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ searchNote }) {
    
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <SearchIcon sx={{ width: "2rem", height: "2rem" }}></SearchIcon>
        <input onChange={(event) => searchNote(event.target.value)} type="text" placeholder="Search"></input>
      </div>
    </div>
  );
}
