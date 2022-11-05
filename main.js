class notemaking 
{
    constructor(fname,lname,uname,password,note)
    {
    this.FN=fname;
    this.LN=lname;
    this.UN=uname;
    this.Pwd=password;
    this.Note=note;

    }
    getFN(){
        return this.FN;
    }
    getLN(){
        return this.LN;
    }
    getUN(){
        return this.UN;
    }
    getPwd()
    {
        return this.Pwd;
    }
    getNote()
    
    {
        return this.Note;
    }
     getUser()
     {
        return this.User;
      }
    getLoginpwd()
    {
        return this.Loginpwd;
    } 
    setFN(fname){
        this.FN=fname;
    }
    setLN(lname){
        this.LN=lname;
    }      
    setUN(uname){
        this.UN=uname;
    }
    setPwd(password)
    {
        this.Pwd=password;
    }
    setNote(note)
    {
        this.Note=note;
    }
    setUser(user)
    {
        this.User=user;
    }
    setLoginpwd(password)
    {
        this.Loginpwd=password;
    }
}
const registration=document.getElementById("register-form");
if(registration) registration.addEventListener('submit',register)
function register(e){
    e.preventDefault();
    let firstname=document.getElementById('fname').value;
    let lastname=document.getElementById('lname').value;
    let username=document.getElementById('uname').value;
    let passwrd=document.getElementById('password').value;

    let regi= new notemaking(firstname,lastname,username,passwrd,);
    console.log(regi.FN)
    console.log(regi.LN)
    console.log(regi.UN)
    console.log(regi.Pwd)
    registration.reset();
}
const loginform=document.getElementById("login-page");
if(loginform) loginform.addEventListener('submit', loginuser)
function loginuser(l){
    l.preventDefault();
    let user=document.getElementById('uname').value;
    let password=document.getElementById('password').value;
    console.log(`${user}`);
    console.log(`${password}`);
    loginform.reset();
}

const noteform=document.getElementById("note-form");
if(noteform) noteform.addEventListener('submit',notem)
function notem(f)
{
    f.preventDefault();
    let notetext=document.getElementById('noteid').value;
    let regi=new notemaking(notetext);
    console.log(`${notetext}`);
    noteform.reset();
}