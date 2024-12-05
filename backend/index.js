// entry point for express
require('dotenv').config()
const express=require('express');
const todoRouter = require('./Routes/userRoutes')
const cors =require('cors');
const RunServer = require('./Database/connection');


const app=express();
const port = process.env.PORT || 3000;

// json: transmitting the data b/w  client and server
app.use(express.json())
// backend port no 3000,frontend  port no 5173
// to connect that we are using cors
app.use(cors())

RunServer()

app.use('/todolist',todoRouter)


app.listen(port, ()=>{
    console.log(`server is running on ${port} port!`)
})