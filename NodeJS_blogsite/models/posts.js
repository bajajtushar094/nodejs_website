const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    comment :{
        type:String,
        // required: true,
    },
    author:{
        type: String,
        // required: true,
    }
},{
    timestamps: true
});

const postSchema = new Schema({
    name: {
        type: String,
    },
    body:{
        type: String ,
    },
    // image:{
    //     type: String,
    // },
    comments: [commentSchema]
    },
    {
    timestamp: true
});

var Posts = mongoose.model('Post',postSchema);

module.exports=Posts;
