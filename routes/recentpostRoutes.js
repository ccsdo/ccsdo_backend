const express = require("express");
const RecentPost = require("../models/RecentPost");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/recent-posts-add",auth, async (req,res)=>{
    try {
        const {data} = req.body;
        const newPost = new RecentPost({data});
        await newPost.save();
        res.status(201).json({message: "Recent post added successfully", post: newPost});
    } catch (error) {
        console.error("Error adding recent post:", error);
        res.status(500).json({message: "Server error"});
    }
})


router.get("/recent-posts", async (req,res)=>{
    try {
        const posts = await RecentPost.find().sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = router;