const express = require('express');
const bodyParser = require('body-parser');
const User =require('../models/user');
const passport = require('passport');
var authenticate = require('../authenticate.js');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

const router = express.Router();
router.use(bodyParser.json());

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// GET users list.

router.get('/',function(req,res,next) {
    res.send('respond with a resource');
});

router.post('/signup',(req,res,next) => {
    User.register(new User({username: req.body.username}),
    req.body.password, (err,user) => {
        if(err){
        res.statusCode= 500;
        res.setHeader('Content-Type','application/json');
        res.json({err:err});
        }
        else{
            passport.authenticate('local')(req , res, ()=>{
                res.statusCode= 200;
                res.redirect('/login');
            });
        }
    });
});


router.post('/login', passport.authenticate('local'),(req,res) =>{
    var token = authenticate.getToken({_id:req.user._id});
    res.statusCode= 200;
    res.setHeader('Content-Type','text/html');
    res.redirect('/');
});

// router.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
    status: 'Bye!'
  });
});


module.exports = router;
