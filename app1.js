const express = require("express"); //imported express module here
const app = express();
const port =3000;
const bodyparser= require("body-parser");
const path=require("path");
// const fs=require("fs");

// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
   mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
 // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone_no:Number,
    password: Number
  });
const Contacts = mongoose.model('Contacts', contactSchema);
const Clients = mongoose.model('Clients', contactSchema);
//here Contacts and Clients are the collections and contactDance is a database.


//express specific stuff
app.use('/static',express.static('static'));//for serving static files

//To extract the data from the website to the app.js file, we have to write-
app.use(express.urlencoded());

//pug specific stuff
app.set('view engine', 'pug');// Set the template engine as pug
app.set('views',path.join(__dirname,'views'));// Set the views directory

//end  points
app.get("/", (req, res)=>{ 
    // const params={'title':'PUBG','content':'pubg is the #1 mobile game in the world!!!'};
    res.status(200).render('index.pug');
});
app.get("/contact", (req, res)=>{ 
    res.status(200).render('contact.pug');
});
app.post("/contact", (req, res)=>{ 
    var mydata=new Contacts(req.body);
    mydata.save().then(()=>{
        res.send("this items has been saved to the database");
    }).catch(()=>{
        res.send("error while saving this items");
    })
});

 
//start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

