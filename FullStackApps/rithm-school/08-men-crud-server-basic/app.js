const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));

const instructorRoutes = require("./routes/instructors");
app.use('/instructors', instructorRoutes);

app.get('/', function(req,res){
    res.redirect('/instructors')
});

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});