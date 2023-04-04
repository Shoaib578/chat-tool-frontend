import React, { useEffect, useState } from "react";
import './chat.css'
import Axios from 'axios'
import socketIO from 'socket.io-client';
import Message from "../../../components/message";
const socket = socketIO.connect('http://localhost:5000');


const storage = localStorage.getItem('user')
const parse = JSON.parse(storage)


export default function ViewChannel(){
   const [message,setMessage] = useState("")
   const [messages,setMessages] = useState([])
   const [replies,setReplies] = useState([])

  
   const send_message = ()=>{
    if(message.length<1){
      return
    }
    socket.emit('message', {
      message: {
        "message":message,
        "user_id":parse.user_id,
        "channel_id":parseInt(window.location.pathname.split("/")[2])
      },
     
    });

    get_messages()
   
   }

  const get_messages = ()=>{
    console.log("GETTING messages")
    Axios.get("http://localhost:5000/apis/message/get_messages?channel_id="+parseInt(window.location.pathname.split("/")[2]))
    .then(res=>{
      console.log(res.data)

      setReplies(res.data.replies)
      setMessages(res.data.data)
    })
    .catch(err=>{
      console.log(err.message)
    })
   }
   const is_loggedin = ()=>{
    if(!localStorage.getItem('user')){
      window.location = '/signin'

    }
    }

   useEffect(()=>{
    is_loggedin()
    get_messages()
   },[])

   useEffect(()=>{
    socket.on('receive_message',(data=>{
      console.log(data)
      get_messages()
    }))
    
   },[socket])

  
 
        return <>
        <div className="chat_window">
          <div className="top_menu">
           
            <div className="title">Chat</div>
          </div>
          <ul className="messages" >
          

          {messages.map((data,index)=>{
              return <Message key={index} user_id={parse.user_id} get_all_messages={get_messages} replies={replies}  data={data}/>
          })}

      


       

            </ul>
          <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
              <input
                onChange={(val)=>setMessage(val.target.value)}
                className="message_input"
                placeholder="Type your message here..."
              />
            </div>
            <div onClick={send_message} className="send_message">
              <div className="icon" />
              <div className="text">Send</div>
            </div>
          </div>
        </div>
       
      </>
      
    }
