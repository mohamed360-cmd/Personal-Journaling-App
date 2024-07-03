require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

app.use(cors())
const userRoutes = require('./Routes/UserRouter')
app.use("/user",userRoutes)
app.listen(process.env.PORT_NUMBER,()=>{
    console.log("Server Active and Listening")
})