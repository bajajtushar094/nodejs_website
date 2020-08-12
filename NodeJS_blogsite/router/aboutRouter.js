const express = require('express');
const bodyParser = require('body-parser');

const aboutRouter = express.Router();

aboutRouter.use(bodyParser.json());

aboutRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next()
})
.get((req,res,next) => {
    res.render('about');
});


module.exports = aboutRouter;
