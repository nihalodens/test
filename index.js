require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router/router')
require('./config/connection')

const tServer = express()

tServer.use(cors())
tServer.use(express.json())
tServer.use(router)

const PORT = 3001

tServer.listen(PORT,()=>{
    console.log(`test server started  at port ${PORT} and waiting for client request!!!n`);
})

tServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red" > Test started and waiting for client request</h1>`)
})

tServer.post('/',(req,res)=>{
    res.status(200).send(`post request`)
})
