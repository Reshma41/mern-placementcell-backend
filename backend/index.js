const express = require('express');
const app = express()
//const routes=require('./Routes/User');
//const routes=require('./Routes/Question');
const cors=require('cors')
const db =require('./dbconnection')
const mongoose= require('mongoose');
const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(cors())
//app.use('/',routes)
//app.listen(5000)  
const userRouter = require("./Routes/User");
app.use("/api/User",userRouter)
const questionRouter = require("./Routes/Question");
app.use("/api/Question",questionRouter)

app.listen(5000, () => {
    console.log("the port is listening on port 5000");
});