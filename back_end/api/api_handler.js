const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
const web_token = require("jsonwebtoken");
const secret = "123HB12EBD1BD23UYBDIiiiucbdsic";
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://cluster0.lnwvlqw.mongodb.net/Social-Network?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0", {
  tlsCertificateKeyFile: "./mongodb.pem",
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
      res.status(201).json({message: `Deleted Note${noteId}`});
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
      throw error;
    }
  });
});

app.listen(4000);
