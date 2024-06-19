require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
const web_token = require("jsonwebtoken");
const secret = process.env.jwt_secret;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://cluster0.lnwvlqw.mongodb.net/Social-Network?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0", {
  tlsCertificateKeyFile: process.env.mongo_cert
});
const User = require("./database-models/UserModel");
const Notes = require("./database-models/NoteModel");

app.use(express.json());
app.use(cookieparser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    res.sendStatus(400);
    return;
  }
  const password_result = bcrypt.compareSync(password, userDoc.password);
  if (password_result) {
    web_token.sign({ username, id: userDoc._id }, secret, { expiresIn: "1h" }, (err, token) => {
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong Password");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("cleared cookie");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  web_token.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.json(info);
  });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({
      username,
      password: bcrypt.hashSync(password, 10),
    });
    const savedUser = await newUser.save();

    const newNote = new Notes({
      userId: savedUser._id,
      notes: [],
    });
    savedNote = await newNote.save();

    savedUser.notesFileId = savedNote._id;

    await savedUser.save();
    res.json(savedUser);
  } catch (e) {
    console.log(e);
    res.status(400).json("Error while creating user");
  }
});

app.get("/note", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  web_token.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    try {
      const user = await User.findById(info.id).populate("notesFileId").select("notesFileId").exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  });
});

app.post("/note", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }
  web_token.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    try {
      const userDoc = await User.findById(info.id);
      if (!userDoc) {
        return res.status(403).json({ message: "User Id not found" });
      }
      const notesDoc = await Notes.findById(userDoc.notesFileId);
      if (!notesDoc) {
        return res.status(404).json({ message: "Notes document not found for the user" });
      }
      const { content } = req.body;
      // Add the new note to the notes array of the Notes document
      notesDoc.notes.push({ content, createdAt: Date.now() });

      // Save the updated Notes document back to the database
      const updatedNotesDoc = await notesDoc.save();

      res.status(201).json(updatedNotesDoc); // Respond with the updated Notes document
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
      throw error;
    }
  });
});

app.delete("/delete", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }
  web_token.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    try {
      const userDoc = await User.findById(info.id);
      if (!userDoc) {
        return res.status(403).json({ message: "User Id not found" });
      }
      const notesDoc = await Notes.findById(userDoc.notesFileId);
      if (!notesDoc) {
        return res.status(404).json({ message: "Notes document not found for the user" });
      }

      const { noteId } = req.body;
      await Notes.findByIdAndUpdate(userDoc.notesFileId, { $pull: { notes: { _id: noteId } } });
      res.status(201).json({ message: `Deleted Note${noteId}` });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
      throw error;
    }
  });
});

app.post("/change-username", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  web_token.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    try {
      const { newUsername } = req.body;
      const updatedUserDoc = await User.findByIdAndUpdate(info.id, { username: newUsername });

      // Re-sign the token with the updated username
      web_token.sign({ username: newUsername, id: info.id }, secret, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          throw err;
        }

        // Update the token in the response cookie
        res.cookie("token", token).json({
          id: updatedUserDoc._id,
          username: newUsername,
        });
      });
    } catch (error) {
      res.status(500).json({ message: "Error changing username", error });
      console.error("Error changing username:", error);
    }
  });
});

app.post("/change-password", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  web_token.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    try {
      const { newPassword, oldPassword } = req.body;
      const userDoc = await User.findById(info.id);
      if (!userDoc) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordResult = bcrypt.compareSync(oldPassword, userDoc.password);
      if (!passwordResult) {
        return res.status(401).json({ message: "Incorrect old password" });
      }
      userDoc.password = bcrypt.hashSync(newPassword, 10);
      await userDoc.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error changing password", error });
      console.error("Error changing password:", error);
    }
  });
});
console.log('Backend is running');
app.listen(4000);
