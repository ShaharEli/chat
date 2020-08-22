import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField"
import io from "socket.io-client"
import "./App.css"
import Pop from './components/Pop'
const socket = io.connect("http://localhost:8282")

function App() {
  const done = (e)=>{
    setShow(false)
    setCurrent({...current,name:e})
    socket.emit("name",e)
  }
  const [show,setShow] = useState(true)
  const [current,setCurrent] = useState({name:"",message:""})
  const [chat,setChat] = useState([])
  socket.on("chat",(data)=>{
    setChat([...chat,{name:data.name,message:data.message}])
  })
  const handleSubmit = e=>{
    e.preventDefault()
    if(current.message.le>0){
      socket.emit("message",current)
      setCurrent({...current,message:""})
    }
    else{
      alert("Enter message")
    }
    
  }
  return (
    <>
    {show&&<Pop done={done}/>}
    <div id="main">
      <div id="form">
        <form onSubmit={(e)=>handleSubmit(e)}>
        <TextField style={{marginTop:20}} multiline  variant="outlined" onChange={(e)=>setCurrent({...current,message:e.target.value})} label="message" value={current.message}/>
        <button style={{marginTop:20}}>send</button>
        </form>
      </div>
      <div id="chat">
        <h1>Chat</h1>
        {chat.map((e,i)=><h2 key={i}><span className="name">{e.name}:</span>{e.message}</h2>)}
      </div>
    </div>
    </>
  )
}

export default App
