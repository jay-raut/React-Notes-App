import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import SnackBar from "./SnackBar";
import { useState } from "react";

export function ChangeUsernameDialog({ open, onClose }) {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [newUsername, setNewUsername] = React.useState("");
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarmessage, setSnackbarMessage] = useState("");
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/change-username", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUsername }),
      });

      if (response.ok) {
        setUserInfo({ ...userInfo, username: newUsername });
        onClose();
        setSnackbarMessage("Changed username successfully");
        setSnackBarVisible(true);
      } else {
        setSnackbarMessage("Could not change username");
        setSnackBarVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing the username");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleFormSubmit,
        }}>
        <DialogTitle>Change Username</DialogTitle>
        <DialogContent>
          <DialogContentText>To change your username, please enter your new username here.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="New Username"
            type="text"
            fullWidth
            variant="standard"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      <SnackBar open={snackBarVisible} setOpen={setSnackBarVisible} message={snackbarmessage} />
    </div>
  );
}

export function ChangePasswordDialog({ open, onClose }) {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarmessage, setSnackbarMessage] = useState("");
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (confirmNewPassword !== newPassword) {
      setSnackbarMessage("New passwords do not match");
      setSnackBarVisible(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/change-password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (response.ok) {
        onClose();
        setSnackbarMessage("Changed password successfully");
        setSnackBarVisible(true);
        setNewPassword("");
        setOldPassword("");
        setConfirmNewPassword("");
      } else {
        setSnackbarMessage("Could not change password or password does not match");
        setSnackBarVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing password");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleFormSubmit,
          style: { width: "600px", maxWidth: "600px" },
        }}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter old password</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="old-password"
            name="old-password"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <DialogContentText>Enter new password</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="new-password"
            name="new-password"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <DialogContentText>Confirm password</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      <SnackBar open={snackBarVisible} setOpen={setSnackBarVisible} message={snackbarmessage} />
    </div>
  );
}
