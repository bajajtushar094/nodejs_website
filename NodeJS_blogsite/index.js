const express =require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser =require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authenticate = require('./authenticate.js');
const mongoose = require ('mongoose');
const Posts = require('./models/posts');
const config = require('./config');
const ObjectId = require("mongodb").ObjectId;

const hostname = 'localhost';
const port =3000;

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('Conneted correctly to server ');
},(err) => {console.log(err);});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// app.get('/',(req,res,next) =>{
//   res.render('index');
// });

app.get('/', async (req, res) => {
    const posts = await Posts.find({})
    res.render('home', {
        posts
    })
});
// app.get('/post/:id', async (req, res) => {
//     const post = await Posts.findById(req.params.id)
//     res.render('post', { post : post })
// });


// router.get('/edit/:id', async (req, res) => {
//   const article = await Article.findById(req.params.id)
//   res.render('articles/edit', { article: article })
// })


const userRouter = require('./router/users');
app.use('/users', userRouter);

app.get('/register',(req,res,next) =>{
  res.render('register');
});

app.get('/login',(req,res,next) =>{
  res.render('login');
});

app.get('/post1',(req,res,next) =>{
  res.render('post');
});

const aboutRouter = require('./router/aboutRouter');
app.use('/about', aboutRouter);


const contactRouter = require('./router/contactRouter');
app.use('/contact', contactRouter);

const postRouter = require('./router/postRouter');
app.use('/post', postRouter);

app.post('/submit', (req, res) => {
  console.log(req.body);
  const post = new Posts(req.body);

  post.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
});


const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Server running at http://:${hostname}:${port}/`);
});
