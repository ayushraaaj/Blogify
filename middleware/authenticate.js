const {validateToken} = require('../services/authenticaton');

function checkForAuthentication(cookieName){
    try {
        return (req, res, next) => {
            const tokenCookieValue = req.cookies[cookieName];
            if(!tokenCookieValue){
                return next();
            }
    
            try {
                const userPayLoad = validateToken(tokenCookieValue);
                req.user = userPayLoad;
            } catch (error) {}
    
            return next();
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });  
    }
}

module.exports = {
    checkForAuthentication
}