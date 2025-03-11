const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
const connectToDB = require('./config/db');
connectToDB();

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render("index")
})

app.use('/user', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
