require('dotenv').config();
const {Router} = require('express');
const router = Router();

const { signup, signin, postSignup, postSignin, signout, updateProfileImage, postUpdateProfileImage } = require('../controllers/userController');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.resolve(`./public/images`))
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, `${uniqueSuffix}-${file.originalname}`)
//     }
//   })

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Blogify_Uploads/ProfileImages',
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return uniqueSuffix;
    }
  }
});
  
const upload = multer({ storage: storage });

router.get('/signup', signup);
router.get('/signin', signin);

router.get('/updateProfileImage', updateProfileImage);

router.post('/updateProfileImage', upload.single('profileImage'), postUpdateProfileImage);

router.post('/signup', postSignup);
router.post('/signin', postSignin);

router.get('/signout', signout);

module.exports = router;