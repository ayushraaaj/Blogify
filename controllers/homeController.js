const Blog = require('../models/blog');

async function homeController(req, res){
    const allBlogs = await Blog.find({});
    return res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
}

module.exports = {
    homeController
}