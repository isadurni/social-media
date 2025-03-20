const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

// CREATE A POST (LOGIN REQUIRED)
router.post('/', verifyToken, async(req,res)=>{
    const postData = new Post({
        title:req.body.title,
        description:req.body.description,
        likes:req.body.likes,
        createdBy:req.user._id
    })
    try {
        const postToSave = await postData.save()
        res.send(postToSave)
    } catch(err) {
        res.send({message:err})
    }
})

// GET ALL POSTS (PUBLIC)
router.get('/', async(req,res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

// GET A SINGLE POST (PUBLIC)
router.get('/:postId', async(req,res)=>{
    try {
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    } catch(err) {
        res.send({message:err})
    }
})

// UPDATE A POST (LOGIN REQUIRED)
router.patch('/:postId', verifyToken, async(req,res)=>{
    try {
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                title:req.body.title,
                description:req.body.description,
                likes:req.body.likes,
                createdBy:req.user._id
                }
            })
        res.send(updatePostById)
    } catch(err) {
        res.send({message:err})
    }
})

// DELETE A POST (LOGIN REQUIRED)
router.delete('/:postId', verifyToken, async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    } catch(err) {
        res.send({message:err})
    }
})

module.exports = router