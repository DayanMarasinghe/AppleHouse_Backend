const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    post: {
        type:String,
        required: true
    },
    status: {
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    }
})

module.exports=mongoose.model('post',postSchema)