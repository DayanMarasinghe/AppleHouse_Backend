const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    postID: {
        type:String,
        required: true
    },
    comment: {
        type:String,
        required: true
    }
})

module.exports=mongoose.model('comment',commentSchema)