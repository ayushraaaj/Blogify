const JWT = require('jsonwebtoken');
const secret = '�M��I\x07Zڔ\x01��-U}�dfdereefhgwsasfg@*$^)#$&(';

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
    }

    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    const user = JWT.verify(token, secret);
    return user;
}

module.exports = {
    createTokenForUser,
    validateToken
}