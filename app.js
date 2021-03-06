
const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js"); Not using date to recude the complexity
const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost:27018/contacts", { useNewUrlParser: true,useUnifiedTopology: true });

// const numberSchema = new mongoose.Schema({
//   number : String
//
// });
// const Number = mongoose.model("Number",numberSchema );
// //
// const emailSchema = new mongoose.Schema({
//   email : String
// });
//
// const Email = mongoose.model("Email", emailSchema);


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-kaurman:test-123@cluster0-vxkhh.mongodb.net/contactsDB",{ useNewUrlParser: true,useUnifiedTopology: true });


const contactSchema = new mongoose.Schema({
  name : String,
  mobileNo : [String],
  email: [String]
})

const Contact = mongoose.model("Contact", contactSchema);

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

 app.post("/remove", function(req,res){
   const recv= req.body.removeid;
   Contact.deleteOne({_id: recv}, function(err){
     if(!err){
       res.redirect("/");
     }
     else{
       console.log("Oops something went wrong");
     }
   })
 });

app.post("/add", function(req,res){
  //console.log(req.body    );
  const contactName = req.body.name;
  const contactEmail = req.body.email;
  const contactTel = req.body.tel;

  const newContact = new Contact({
    name: contactName,
    mobileNo:contactTel,
    email: contactEmail
  })
  newContact.save();
  res.redirect("/");
});

app.post("/search", function(req,res){
  const query = req.body.search;
  Contact.find({name: {'$regex': query}}, function(err, findObjects){
    if(!err)
    {
      if(findObjects)
      {
        res.render("home", {contactList: findObjects});
      }
      else{
        res.render("home",);
      }
    }
  });
})

app.listen(3000, function(){
  console.log("Listening");
});
