import { useContext } from "react";
import { UserContext } from "../UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material"
import { format } from "date-fns";
import "../App.css";
export default function HomePage() {
  const { userInfo } = useContext(UserContext);

  const username = userInfo?.username;

  return (
    <div className="container">
      <>
        <div className="splash-page">
          <h1>Welcome to Notes </h1>
          <p>All your notes - in the cloud.</p>
          {username && (
            <>
            <Button href="/notes" sx={{backgroundColor:"#333", '&:hover': {backgroundColor:"#555"}, color:"white"}}>Go to my notes</Button>
            </>
          )}
          {!username &&(
            <p>To get started. Log in or register</p>
          )}
          <div className="note-example">
            <span>This is an example note. Create more like this by getting started</span>
            <div className="note-footer">
              <small>Created on: {format(new Date(), "MMMM d, yyyy h:mm a")}</small>
              <IconButton aria-label="delete" color="inherit" sx={{ zIndex: 1000 }}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
