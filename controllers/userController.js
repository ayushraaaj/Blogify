const User = require('../models/user');
const {createTokenForUser, validateToken} = require('../services/authenticaton');

async function signup(req, res){
    try {
        const tokenCookieValue = req.cookies['token'];
        if(!tokenCookieValue){
            return res.render('signup');
        }
        else if(validateToken(tokenCookieValue)){
            return res.redirect('/');
        }
    
        return res.render('signup');
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

async function signin(req, res){
    try {
        const tokenCookieValue = req.cookies['token'];
        if(!tokenCookieValue){
            return res.render('signin');
        }
        else if(validateToken(tokenCookieValue)){
            return res.redirect('/');
        }
        return res.render('signin');
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

async function postSignup(req, res){
    try {
        const {fullName, email, password} = req.body;
    
        await User.create({
            fullName,
            email,
            password
        });
    
        return res.redirect('/user/signin');
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

async function postSignin(req, res){
    const {email, password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie('token', token).redirect('/');
    } catch (error) {
        return res.render('signin', {
            error: 'Incorrect Email/Password'
        });
    }
}

async function signout(req, res){
    try {
        return res.clearCookie('token').redirect('/');
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

async function updateProfileImage(req, res){
    try {
        return res.render('profileImageUpload', {
            user: req.user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

async function postUpdateProfileImage(req, res){
    try {
        await User.findByIdAndUpdate(req.user._id, {
            profileImageUrl: `/images/${req.file.filename}`
        });
        
        const userDetail = await User.findById(req.user._id);
        const user = {
            _id: userDetail._id,
            fullName: userDetail.fullName,
            email: userDetail.email,
            profileImageUrl: userDetail.profileImageUrl
        }
    
        const token = createTokenForUser(user);
        res.cookie('token', token);
    
        return res.redirect('/');    
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

module.exports = {
    signup,
    signin,
    postSignin,
    postSignup,
    signout,
    updateProfileImage,
    postUpdateProfileImage
}