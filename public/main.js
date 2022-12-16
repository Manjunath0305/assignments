/*let nav = document.querySelector('nav');

if(getCurrentUser()) {
  nav.innerHTML = `
    <ul>
      <li><a href="bmi.html">Calculate</a></li>
      <li><a href="profile.html">Profile</a></li>
      <li><a id="logout-btn">Logout</a></li>
    </ul>
  `
} else {
  nav.innerHTML = `
    <ul>
      <li><a href="bmi.html">Calculate</a></li>
      <li><a href="login.html">Login</a></li>
      <li><a href="register.html">Sign Up</a></li>
    </ul>
  `
}*/

// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
} 

// logout event listener
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

// stateful mechanism for user
// logging in a user
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// getting current user function
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// logout function for current user
function removeCurrentUser() {
  localStorage.removeItem('user');
  window.location.href = "login.html";
}

class User {
    constructor(uname, password, fname, lname) {
      this.uname = uname;
      this.password = password;
      this.fname = fname;
      this.lname = lname;
    }
  
    getUsername() {
      return this.uname;
    }
  }
  
  // login functionality
  let loginForm = document.getElementById("login-page");
  if(loginForm) loginForm.addEventListener('submit', login);
  
  function login(e) {
    e.preventDefault();
  
    let uname = document.getElementById("uname").value;
    let password = document.getElementById("password").value;
    let user = new User(uname, password);
  
    fetchData("/users/login", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "Note page.html";
    })
    .catch((err) => {
      console.log(err);
    }) 
  }
   
  // register functionality
  let regForm = document.getElementById("register-form");
  if(regForm) regForm.addEventListener('submit', register);
  
  function register(e) {
    e.preventDefault();
  
    let uname = document.getElementById("uname").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let password = document.getElementById("password").value;
    let user = new User(uname, password, fname, lname);
  
    fetchData("/users/register", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "Note Page.html";
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  class Note{
    constructor(notes) {
      this.notes = notes;
    }
    getNotes() {
      return this.notes;
    }
  }
let user=getCurrentUser();
let note = document.getElementById("note-form");
if(note) note.addEventListener('submit',notePageFunction)
function notePageFunction(e){
    e.preventDefault();
    let notedata= document.getElementById('note').value;
    const note = new Note(notedata);
    note.userID = user.userID;
    fetchData("/notes/create", note, "POST")
    .then((data) => {
      setCurrentUser(data);
      alert("note added")
      window.location.href = "Note page.html";
    })
    .catch((err) =>{
      console.log(err);
    })
 document.getElementById("note-form").reset();
}