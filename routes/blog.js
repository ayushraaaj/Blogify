const {Router} = require('express');
const router = Router();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { addNewBlog, postAddNewBlog, viewBlog, createComment, deletePost } = require('../controllers/blogController');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(`./public/uploads`))
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, `${uniqueSuffix}-${file.originalname}`)
//   }
// })

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Blogify_Uploads/BlogCoverImages',
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return uniqueSuffix;
    }
  }
});

const upload = multer({ storage: storage });

router.get('/add-new', addNewBlog);

router.post('/', upload.single('coverImage'), postAddNewBlog);

router.get('/:id', viewBlog);

router.get('/delete/:id', deletePost);

router.post('/comment/:blogId', createComment);

module.exports = router;