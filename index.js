const express = require('express');
const port = 8002;
const path = require('path');
const cookieParser = require('cookie-parser');

const {connectMongoDB} = require('./connection');
const { checkForAuthentication } = require('./middleware/authenticate');

const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');



const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded());
app.use(express.static(path.resolve('./public')));
app.use(cookieParser());
app.use(checkForAuthentication('token'));

connectMongoDB('mongodb+srv://ayushraaaj:Ayushraj9t8@cluster0.fgswm2z.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB');
});

app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});