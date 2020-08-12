const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');


const Posts = require('../models/posts');

const postRouter = express.Router();

postRouter.use(bodyParser.json());

postRouter.route('/')
.get((req,res,next) => {
     // res.render('post');
    Posts.find({})
    .then((post)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(post);
    },(err) =>next(err))
    .catch((err) =>next(err));
})
// .post((req,res,next)=>{
//     Posts.create(req.body)
//     .then((post)=>{
//         console.log('Post Created ', post);
//         res.statusCode=200;
//         res.setHeader('Content-Type','application/json');
//         res.json(post);
//     },(err) => next(err))
//     .catch((err)=>next(err));
// })
.post((req, res) => {
  console.log(req.body);
  const post = new Posts(req.body);

  post.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err)});
})

.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on / post ');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Posts.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err)=>next(err));
});

postRouter.route('/:id')
// .get((req,res,next)=>{
//     Posts.findById(req.params.postId)
//     .then((post)=>{
//         // console.log('Post Created ', post);
//         res.statusCode=200;
//         // res.setHeader('Content-Type','application/json');
//         // res.json(post);
//         res.render('post', { post })
//     },(err) => next(err))
//     .catch((err)=>next(err))
// })
.get(async (req, res) => {
    const post = await Posts.findById(req.params.id)
    res.setHeader('Content-Type','text/html');
    res.render('post', { post : post })
})
// app.get('/post/:id', async (req, res) => {
//     const post = await Posts.findById(req.params.id)
//     res.render('post', { post : post })
// });
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on / posts ');
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Posts.findByIdAndUpdate(req.params.postId,{
        $set: req.body
    },{new:true})
        .then((post)=>{
        console.log('Post Created ', post);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(post);
    },(err) => next(err))
    .catch((err)=>next(err));
})
.delete(authenticate.verifyUser,(req,res,next)=>{
   post.findByIdAndRemove(req.paramspostId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err)=>next(err));
});

// postRouter.route('/')
// .all((req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/html');
//     next();
// })
// .get((req,res,next) => {
//     res.render('post');
// });


module.exports = postRouter;
