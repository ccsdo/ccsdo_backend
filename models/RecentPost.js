const mongoose = require("mongoose");

const recentPostSchema  = new mongoose.Schema({
    data: String,
}, { timestamps: true });

const RecentPost = mongoose.model("RecentPost", recentPostSchema);

module.exports = RecentPost;