const express = require("express")
const app  = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
app.use(express.static("..client/build"))
io.on("connection",(socket)=>{
    socket.on("message",(data)=>{
        io.emit("chat",(data))
    })
    socket.on("name",e=>{
        io.emit("chat",({name:"",message:e+" logged in"}))
    })
})



http.listen(8282,()=>{
    console.log("listening on port 8282");
})