const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
var cors = require('cors')
const auth = require('./routes/authRoute')
const test = require('./middlewares/authMiddleware')
dotenv.config()

// db config
connectDB();

const app = express();

// middlewares
app.use(cors())
app.use(express.json());

//api 
app.use('/api/auth',auth)


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
})