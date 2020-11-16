import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField"
import io from "socket.io-client"
import "./App.css"
import Pop from './components/Pop'
import swal from 'sweetalert';
import Button from "@material-ui/core/Button"

const socket = io.connect("http://34.90.196.151:8080/)

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
  const handleSubmit = ()=>{
    if(current.message.length>0){
      socket.emit("message",{...current,name:current.name+":"})
      setCurrent({...current,message:""})
    }
    else{
      swal("Enter message","","error")
    }
    
  }
  return (
    <>
    {show&&<Pop done={done}/>}
    <div id="main">
      <div id="form">
        <form>
        <TextField style={{marginTop:20}} multiline  variant="outlined" onChange={(e)=>setCurrent({...current,message:e.target.value})} label="message" value={current.message}/>
        <Button onClick={handleSubmit} style={{marginTop:20,marginBottom:20}} variant="contained" color="primary">Send</Button>
        </form>
      </div>
      <div id="chat">
        <h1 id="chatName">Chat</h1>
    
        {chat.map((e,i)=><h2 key={i}><span className="name">{e.name}</span>{e.message}</h2>)}
      </div>
    </div>
    </>
  )
}

export default App
