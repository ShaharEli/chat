import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField"
import io from "socket.io-client"
import "./App.css"
const socket = io.connect("http://localhost:8282")
function App() {
  const [current,setCurrent] = useState({name:"",message:""})
  const [chat,setChat] = useState([])
  socket.on("chat",(data)=>{
    setChat([...chat,{name:data.name,message:data.message}])
  })
  const handleSubmit = e=>{
    e.preventDefault()
    socket.emit("message",current)
    setCurrent({...current,message:""})
  }
  return (
    <div id="main">
      <div id="form">
        <form onSubmit={(e)=>handleSubmit(e)}>
        <TextField style={{marginTop:20,width:100}}variant="outlined" onChange={(e)=>setCurrent({...current,name:e.target.value})} label="name" value={current.name}/>
        <TextField style={{marginTop:20}} multiline  variant="outlined" onChange={(e)=>setCurrent({...current,message:e.target.value})} label="message" value={current.message}/>
        <button style={{marginTop:20}}>send</button>
        </form>
      </div>
      <div id="chat">
        <h1>Chat</h1>
        {chat.map((e,i)=><h2 key={i}><span className="name">{e.name}:</span>{e.message}</h2>)}
      </div>
    </div>
  )
}

export default App
