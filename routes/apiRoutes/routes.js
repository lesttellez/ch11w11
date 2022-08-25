const { db } = require("../../db/db.json");
const router = require("express").Router();
const fs = require("fs");
//npm package to create a random unique id
const { v4: uuidv4 } = require("uuid");

//get notes from db.json if there are any
const savedNotes = fs.readFileSync("./db/db.json", "UTF-8");
if (savedNotes) {
  let oldNotes = JSON.parse(savedNotes);
  notes = oldNotes;
} else {
  notes = [];
}

//display those notes to the page
router.get("/notes", (req, res) => {
  return res.json(notes);
});

//collect client input data, store it and write it to the page
router.post("/notes", function (req, res) {
  let noteId = uuidv4();
  let newNote = {
    id: noteId,
    title: req.body.title,
    text: req.body.text,
  };
  //collect the data and push it into db.json
  console.log(newNote);
  notes.push(newNote);
  res.json(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (
    err
  ) {
    if (err) throw err;
  });
});

//Delete a note from the notes array based on its unique ID
router.delete("/notes/:id", (req, res) => {
  let deleteNote = notes.findIndex((item) => item.id === req.params.id);
  notes.splice(deleteNote, 1);

  //write the updated array to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (
    err
  ) {
    if (err) throw err;
  });
  res.json({ deletion: "Note Deleted!" });
});

module.exports = router;