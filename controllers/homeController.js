const Blog = require('../models/blog');

async function homeController(req, res){
    try {
        const allBlogs = await Blog.find({});
        return res.render('home', {
            user: req.user,
            blogs: allBlogs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

module.exports = {
    homeController
}