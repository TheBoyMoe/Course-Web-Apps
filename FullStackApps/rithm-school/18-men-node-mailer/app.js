/*
    References:
    [1] https://app.mailgun.com/new/signup/ (mailgun signup - free account)
    [2] https://github.com/nodemailer/nodemailer (node mail server)
    [3] https://nodemailer.com/about/
    
 */
require('dotenv').config({path: 'variables.env'});

const app = require("express")();
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended:true}));


const auth = {
    auth: {
        api_key: process.env.SECRET_KEY,
        domain: process.env.DOMAIN
    }
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

app.get("/", function(req,res){
    res.render("index");
});

app.get("/new", function(req,res){
    res.render("new");
});

app.post('/', function(req,res){
    const mailOpts = {
        from: 'elie@yourdomain.com',
        to: req.body.to,
        subject: req.body.subject,
        text : 'test message form mailgun',
        html : '<b>test message form mailgun</b>'
    };
    
    nodemailerMailgun.sendMail(mailOpts, function (err, response) {
        if (err) res.send(err);
        else {
            res.send('email sent!')
        }
    });
});

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});