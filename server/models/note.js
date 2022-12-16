const con = require("./db_connect");


async function createTable() {
await con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB}`);
await con.query(`USE ${process.env.MYSQL_DB}`) ;
let sql=`CREATE TABLE IF NOT EXISTS notes (
  noteID INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  notes VARCHAR(255) NOT NULL,
  CONSTRAINT notePK PRIMARY KEY(noteID)
); `
await con.query(sql);
}
createTable();

async function create(note) {

const sql = `INSERT INTO notes (userID, notes)
  VALUES ("${note.userID}","${note.notes}");
`

await con.query(sql);
return {success:"Note Added"};
}


async function getAllNotes() {
 const sql = "SELECT * FROM notes;";
 let notes = await con.query(sql);
 console.log(notes)
 return notes;
}


async function getNote(note) {
  let sql;
  
    sql = `
      SELECT * FROM notes
       WHERE noteID = ${note.noteID}
    `
  
  return await con.query(sql);  
  }


async function editNote(note) {
  let sql = `UPDATE notes 
    SET notes = "${note.notes}"
    WHERE noteID = ${note.noteID}
  `;
  
  await con.query(sql);
  let updatedNote = await getNote(note);
  return updatedNote[0];
  }

async function deleteNote(note) {
  let sql = `DELETE FROM notes
    WHERE noteID = ${note.noteID}
  `
  await con.query(sql);
  }

module.exports = { getAllNotes, getNote, create, deleteNote, editNote}