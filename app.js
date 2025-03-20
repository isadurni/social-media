const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json())

const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

app.use('/api/posts',postsRoute)
app.use('/api/user',authRoute)

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTOR).then(() => {
    console.log('DB is now connected!');
})

// Server listens in port 3000
app.listen(3000, ()=>{
    console.log('Server is up and running...')
})