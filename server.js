var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var passport = require("passport");
var Strategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies






passport.use(new Strategy(
  function(username, password, cb) {
  	if (username == 'rahul' && password == 'pass') return cb(null, {id:username, username:username, password:password});
  	cb(null, false);
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  if (id == "rahul") return cb(null, {id:'rahul', username: 'rahul', password: 'pass'});
  cb("Error");
});


app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'secret pasword jj', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
  });


/*
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-two',function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article-one',function (req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

*/

app.get('/login', function(req, res){
	if (req.user) return res.redirect('/');
	res.sendFile(path.join(__dirname, 'view', 'login.html'));
});


app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

app.use(express.static("ui"));
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
