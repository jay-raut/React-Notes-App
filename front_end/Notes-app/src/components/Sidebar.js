import React from "react";
import { Drawer, IconButton } from "@mui/material";
import { Typography, Box } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NotesIcon from '@mui/icons-material/Notes';

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";

export default function SidebarNav() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <IconButton
        className="sidebar-icon"
        size="large"
        edge="end"
        color="inherit"
        aria-label="open drawer"
        onClick={() => setDrawerOpen(true)}
        sx={{
          color: "white",
          marginLeft: -2,
        }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box p={2} width="400px" textAlign="center" role="presentation" sx={{ position: "relative", padding: 0 }}>
          <IconButton
            className="sidebar-icon"
            size="large"
            edge="start"
            color="inherit"
            aria-label="close drawer"
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: "black",
              position: "absolute",
              left: 20,
              top: 6,
              zIndex: 1001,
            }}>
            <ChevronLeftIcon sx={{ width: "1.8rem", height: "1.8rem" }}  />
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
              zIndex: 1000,
            }}>
           Notes
          </Typography>
          <Box sx={{ marginTop: 7,textAlign: "left", borderTop:"1px solid grey", width: "100%" }}>
            <Button
              component={Link}
              to="/"
              startIcon={<HomeIcon sx={{ width: "1.8rem", height: "1.8rem" }} />} // Increase the icon size here
              sx={{
                color: "black",
                justifyContent: "flex-start",
                textTransform: "none",
                width: "100%",
                marginLeft: 2,
                height: 60, // Adjust the height here
                fontSize: "1.3rem", // Increase the text size here
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Change background color on hover
                },
              }}
              onClick={() => setDrawerOpen(false)}>
              <Typography variant="h6" sx={{ marginLeft: "20px", fontSize: "1.4rem" }}>
                Home
              </Typography>
            </Button>
          </Box>
          <Box sx={{ marginTop: 0,textAlign: "left", borderTop:"1px solid grey", width: "100%" }}>
            <Button
              component={Link}
              to="/notes"
              startIcon={<NotesIcon sx={{ width: "1.8rem", height: "1.8rem" }} />} // Increase the icon size here
              sx={{
                color: "black",
                justifyContent: "flex-start",
                textTransform: "none",
                width: "100%",
                marginLeft: 2,
                height: 60, // Adjust the height here
                fontSize: "1.3rem", // Increase the text size here
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Change background color on hover
                },
              }}
              onClick={() => setDrawerOpen(false)}>
              <Typography variant="h6" sx={{ marginLeft: "20px", fontSize: "1.4rem" }}>
                My Notes
              </Typography>
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
