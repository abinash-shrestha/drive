const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();

const indexRouter = require('./routes/index.routes');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/user', userRouter);
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
