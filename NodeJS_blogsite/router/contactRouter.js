const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const contactRouter = express.Router();

contactRouter.use(bodyParser.json());

contactRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next()
})
.get((req,res,next) => {
    res.render('contact');
});

module.exports = contactRouter;
