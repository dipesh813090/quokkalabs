require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const cors = require('cors');

const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions))

const connectDB = require('./config/db');
connectDB();

app.use(express.json());


// Routes 
app.get('/', (req,resp) =>{
    resp.send('welcome page');
});
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/posts', require('./routes/posts'));
app.use('/logged_users', require('./routes/users'));

app.listen(PORT, console.log(`Running on port ${PORT}.`));
