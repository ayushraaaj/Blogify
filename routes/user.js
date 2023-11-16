const {Router} = require('express');
const router = Router();

const { signup, signin, postSignup, postSignin, signout, updateProfileImage, postUpdateProfileImage } = require('../controllers/userController');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/images`))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage });

router.get('/signup', signup);
router.get('/signin', signin);

router.get('/updateProfileImage', updateProfileImage);

router.post('/updateProfileImage', upload.single('profileImage'), postUpdateProfileImage);

router.post('/signup', postSignup);
router.post('/signin', postSignin);

router.get('/signout', signout);

module.exports = router;