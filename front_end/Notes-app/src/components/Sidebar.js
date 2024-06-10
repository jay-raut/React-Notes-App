import React from "react";
import { Drawer, IconButton } from "@mui/material";
import { Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { makeStyles } from "@mui/styles";

export default function SidebarNav() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const useStyles = makeStyles({
    drawer: {
      width: "200px",
    },
  });
  return (
    <>
      <IconButton
        className="sidebar-icon"
        size="large"
        edge="end"
        color="inherit"
        aria-label="open drawer"
        onClick={() => setDrawerOpen(true)} // Open drawer on click
        sx={{
          color: "white", // Set the color to white
          marginLeft: -2, // Example of additional styling
        }}>
        <MenuIcon /> {/* Use MenuIcon instead of MenuItem */}
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)} // Close drawer on click outside
      >
        <Box p={2} width="250px" textAlign="center" role="presentation" sx={{ position: "relative" }}>
          <IconButton
            className="sidebar-icon"
            size="large"
            edge="start"
            color="inherit"
            aria-label="close drawer"
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: "black", // Set the color to black
              position: "absolute",
              left: 20,
              top: 6,
              zIndex: 1001
            }}>
            <CloseIcon /> {/* Use MenuIcon instead of MenuItem */}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute",
              top: 6,
              right: 0,
              left: 1,
              margin: 1,
              zIndex: 1000
            }}>
            Side Panel
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
