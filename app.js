
const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js"); Not using date to recude the complexity
//const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("add-contact");
})

app.post("/add", function(req,res){
  console.log(req.body    )
});

app.listen(3000, function(){
  console.log("Listening");
});
