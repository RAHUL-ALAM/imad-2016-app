var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
    user:	'rahul-alam',
    database: '	rahul-alam',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

function createTemplate(data){}
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

var app = express();
app.use(morgan('combined'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

app.get('/signup',function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'signup.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/signup2',function (req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'signup2.html'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
