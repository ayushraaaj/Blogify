const {Router} = require('express');
const router = Router();

const multer = require('multer');
const path = require('path');

const { addNewBlog, postAddNewBlog, viewBlog, createComment, deletePost } = require('../controllers/blogController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage });

router.get('/add-new', addNewBlog);

router.post('/', upload.single('coverImage'), postAddNewBlog);

router.get('/:id', viewBlog);

router.get('/delete/:id', deletePost);

router.post('/comment/:blogId', createComment);

module.exports = router;