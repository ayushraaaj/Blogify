const Blog = require('../models/blog');
const Comment = require('../models/comment');

async function addNewBlog(req, res){
    try{
        return res.render('addBlog', {
            user: req.user
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });      
    }
}

async function postAddNewBlog(req, res){
    try {
        const {title, body} = req.body;
   
    const blog = await Blog.create({
        title, 
        body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    });

    return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
    
}

async function viewBlog(req, res){
    try {
        const blog = await Blog.findById(req.params.id).populate('createdBy');
        const comments = await Comment.find({blogId: req.params.id}).populate('createdBy');
        return res.render('blog', {
            user: req.user,
            blog,
            comments
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

async function createComment(req, res){
    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id
        });
        
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}
async function deletePost(req, res){
    try {        
        const id = req.params.id;
    
        const blog = await Blog.findById(id).populate('createdBy');
        // console.log(blog.createdBy);
        // console.log(req.user);
    
        const authorizedUser = blog.createdBy._id;
        const requestedUser = req.user._id;
    
        if(authorizedUser != requestedUser){
            return res.send(`<h1>Oh, You didn&#8217t created the post right &#128533 !!! </h1>`);   
        }
    
        await Comment.deleteMany({blogId: id});
        
        await Blog.findByIdAndDelete(id);
    
        return res.redirect('/');
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

module.exports = {
    addNewBlog,
    postAddNewBlog,
    viewBlog,
    createComment,
    deletePost
}