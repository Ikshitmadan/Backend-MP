const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
var cors = require('cors')
const auth = require('./routes/authRoute')
const test = require('./middlewares/authMiddleware')
const { Server } = require('socket.io');

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

const server=app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
})

const io = new Server(server,{
    // pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });;

io.on('connection',(socket)=>{


    console.log(`connected id is ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('user disconnected');
      })

      socket.on('message',(messageData)=>{
        socket.broadcast.emit('recieve', messageData);
    })

    socket.on('codechange',(messageData)=>{

      console.log(messageData.code);
socket.broadcast.emit('codeadded', messageData);
    })


    socket.on('outputchange',(outputData)=>{

      socket.broadcast.emit('outputchange', outputData)
  })

  socket.on('inputchange',(inputData)=>{
    socket.broadcast.emit('inputchange', inputData)

})

})






