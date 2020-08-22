import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {TextField} from '@material-ui/core'
import {Button} from '@material-ui/core'
import swal from 'sweetalert';
import "./Pop.css" 

  function getModalStyle() {
    return {
        top:"20%",
      left:"40%",
      width: "200px",
      height:"400px",
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'relative',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
function Pop(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);
    const [winner,setWinner] = useState("")
    const handleChange =(e)=>{
        setWinner(e.target.value)
    }
    const send =async()=>{
        if(winner.length>0){
           await handleClose()
           await props.done(winner)
        }
        else{
            swal("Enter valid name","","error")
        }
    }
      const handleClose = () => {
        setOpen(false);
      };
      const body = (
        <div id ="example" style={modalStyle} className={classes.paper}>
            <TextField variant="outlined" id="input" value={winner} onChange={(e)=>handleChange(e)}  autoComplete="off" label="Enter name"/>
            <Button onClick={send} variant="contained">submit</Button>
        </div>
      );
    return (
        <>
        <div id="post" >
      <Modal 
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
        </div>
        </>
    )
}

export default Pop