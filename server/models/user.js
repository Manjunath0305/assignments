/*const users = [
  {
      firstname:"Kavya",
      lastname:"Inampudi",
      emailid: "kavya@gmailcom",
       pwd: "12345"
  },
  {
      user: "kavya1gmailcom",
       pwd: "12345"
    
  },
];*/


const con = require("./db_connect");


async function createTable() {
let sql=`CREATE TABLE IF NOT EXISTS users (
  userID INT NOT NULL AUTO_INCREMENT,
  uname VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  CONSTRAINT userPK PRIMARY KEY(userID)
); `;
await con.query(sql);
}
createTable();

async function register(user) {
let cUser = await getUser(user);
console.log(user)
if(cUser.length > 0) throw error("username already in use");

const sql = `INSERT INTO users (uname, password,fname,lname)
  VALUES ("${user.uname}","${user.password}","${user.fname}", "${user.lname}");
`
await con.query(sql);
return await login(user);
}
//Read User -- login user
async function login(user) { // {userName: "sda", password: "gsdhjsga"}
  let cUser = await getUser(user); //[{userName: "cathy123", password: "icecream"}]
 
  if(!cUser[0]) throw Error("Username not found");
  if(cUser[0].password !== user.password  ) throw Error("Password incorrect");

  return cUser[0];
}

async function getAllUsers() {
 const sql = "SELECT * FROM users;";
 let users = await con.query(sql);
 //console.log(users)
 return users;
}


async function getUser(user) {
  let sql;
  
  if(user.userID) {
    sql = `
      SELECT * FROM users
       WHERE userID = ${user.userID}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE uname = "${user.uname}"
  `;
  }
  return await con.query(sql);  
  }

async function editUser(user) {
  let sql = `UPDATE users 
    SET uname = "${user.uname}"
    WHERE userID = ${user.userID}
  `;
  
  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
  }

async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE userID = ${user.userID}
  `
  await con.query(sql);
  }
module.exports = { getAllUsers, login, register, deleteUser, editUser}