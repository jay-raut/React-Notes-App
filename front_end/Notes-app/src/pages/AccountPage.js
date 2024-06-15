import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { ChangeUsernameDialog } from "../components/Dialog";
import { ChangePasswordDialog } from "../components/Dialog";

export default function AccountPage() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const handlePasswordDialogOpen = () => {
    setIsPasswordDialogOpen(true);
  };
  const handlePasswordDialogClose = () => {
    setIsPasswordDialogOpen(false);
  };

  const handleUsernameDialogOpen = () => {
    setIsUsernameDialogOpen(true);
  };

  const handleUsernameDialogClose = () => {
    setIsUsernameDialogOpen(false);
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      <div className="change-account-login">
        <h5>Current Username: {username}</h5>
        <Button variant="contained" onClick={handleUsernameDialogOpen} >
          Change Username
        </Button >
        <Button variant="contained" onClick={handlePasswordDialogOpen}>
          Change Password
        </Button>
      </div>
      <ChangeUsernameDialog open={isUsernameDialogOpen} onClose={handleUsernameDialogClose} />
      <ChangePasswordDialog open={isPasswordDialogOpen} onClose={handlePasswordDialogClose} />
    </div>
  );
}
