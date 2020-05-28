
const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js"); Not using date to recude the complexity
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27018/contacts", { useNewUrlParser: true,useUnifiedTopology: true });

// const numberSchema = new mongoose.Schema({
//   number : String
//
// });
// const Number = mongoose.model("Number",numberSchema );
//
// const emailSchema = new mongoose.Schema({
//   email : String
// });
//
// const Email = mongoose.model("Email", emailSchema);

const contactSchema = new mongoose.Schema({
  name : String,
  mobileNo : [String],
  email: [String]
})

const Contact = mongoose.model("Contact", contactSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  Contact.find({}, function(err, foundItems){
    if(err){
      console.log(Error);
    }
    else{
      res.render("home",{contactList: foundItems});
    }
  })

})
 app.get("/add", function(req,res){
   res.render("add-contact");
 })
app.post("/add", function(req,res){
  //console.log(req.body    );
  const contactName = req.body.name;
  const contactEmail = req.body.email;
  const contactTel = req.body.tel;

  const newContact = new Contact({
    name: contactName,
    mobileNo:[contactEmail],
    email: [contactTel]
  })
  newContact.save();
});

app.listen(3000, function(){
  console.log("Listening");
});
