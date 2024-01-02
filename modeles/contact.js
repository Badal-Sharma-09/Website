const mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
    Email: String,
    problem: String,
    Member: String,
    Professonal: String,
    Hacker: String,
    TellUsYourself: String,
    ElebourateYourConsorn: String
   });

//Create collection

const Contact = new mongoose.model("Contact", ContactSchema);

module.exports = Contact;
