const express = require('express');
const router = express.Router();
const Post = require('../models/postModel')
const Feedback = require('../models/feedbackModel')
const Comment = require('../models/commentModel')
const jwt = require('jsonwebtoken')

//create post
router.post('/create', async (req, res) => {
    const { username, post, status } = req.body

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    try {
        const pst = await Post.create({
            username,
            post,
            status,
            date:time
        })
        res.status(201).json(pst);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
})

router.get("/messages", async (req, res) => {
    try {
      const messages = await Post.find({status: 1});
      res.json(messages);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  router.delete('/delete/:id', async(req, res, ) =>  {

    try{
        const postID = req.params.id;
    
        await Post.findByIdAndDelete(postID)
    }catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }

  })

  router.patch('/approve/:id', async(req, res) => {
    try {
      const postID = req.params.id;
      let obj = {status: 1}
      const group = await Post.findByIdAndUpdate(postID,obj);
    res.status(200).json({
        message: "Success"
    })
    } catch (error) {
      res.status(400).json({message: err.message})
    }
    
  }) 

  router.post('/feedback', async (req, res) => {
    const { postID, feedback } = req.body

    try {
        const pst = await Feedback.create({
            postID,
            feedback
        })
        res.status(201).json(pst);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
})

router.post('/comment', async (req, res) => {
    const { postID, comment } = req.body

    try {
        const pst = await Comment.create({
            postID,
            comment
        })
        res.status(201).json(pst);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
})

module.exports = router;