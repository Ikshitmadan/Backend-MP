const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config()

// db config
connectDB();

const app = express();


// middlewares
app.use(express.json());



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
})