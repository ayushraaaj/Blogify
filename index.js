require('dotenv').config();
const express = require('express');
const port = 8002;
const path = require('path');
const cookieParser = require('cookie-parser');

const {connectMongoDB} = require('./connection');
const { checkForAuthentication } = require('./middleware/authenticate');

const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'diuhoksh5',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded());
// app.use(express.static(path.resolve('./public')));
app.use(cookieParser());
app.use(checkForAuthentication('token'));

connectMongoDB(process.env.MONGODB_URL)
.then(() => {
    console.log('Connected to MongoDB');
});

app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});
