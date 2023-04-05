import React, { useEffect, useRef, useState } from "react";
import './chat.css'
import Axios from 'axios'
import socketIO from 'socket.io-client';
import Message from "../../../components/message";
const socket = socketIO.connect('http://localhost:5000');


const storage = localStorage.getItem('user')
const parse = JSON.parse(storage)

export default function ViewChannel(){
  const messagesEndRef =useRef()
   const [message,setMessage] = useState("")
   const [messages,setMessages] = useState([])
   const [replies,setReplies] = useState([])
   const [search_messages,setSearchMessages] = useState([])
   
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


   const most = ()=>{
    var user_ids = []
    messages.map(i=>{
      user_ids.push(i.added_by)
    })
    const hashmap = user_ids.reduce( (acc, val) => {
      acc[val] = (acc[val] || 0 ) + 1
      return acc
    },{})
    let most_posted = Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
    setSearchMessages(messages.filter(i=>i.added_by == most_posted))

    console.log(most_posted)
  
   }

   const least = ()=>{
    var user_ids = []
    messages.map(i=>{
      user_ids.push(i.added_by)
    })
    const count = user_ids.reduce((a, b) => {
      if (!a[b]) {
      a[b] = 1;
      } else {
      a[b]++;
      }

      return a;
  }, {});

  
  let minCount = Number.MAX_SAFE_INTEGER;
  let numberWithLeastCount = 0;

  //Find the number with least count
  for (const [key, value] of Object.entries(count)) {
      if (value < minCount) {
      minCount = value;
      numberWithLeastCount = key;
      }
  }
  setSearchMessages(messages.filter(i=>i.added_by == numberWithLeastCount))

    console.log(numberWithLeastCount)
   }

  const search_message = (value)=>{
    setSearchMessages(messages.filter(i=>i.message.toLowerCase().includes(value.toLowerCase())))
  }

  const get_messages = ()=>{
    console.log("GETTING messages")
    Axios.get(`http://localhost:5000/apis/message/get_messages?user_id=${parse.user_id}&&channel_id=${parseInt(window.location.pathname.split("/")[2])}`)
    .then(res=>{
      console.log(res.data)

      setReplies(res.data.replies)
      setMessages(res.data.data)
      setSearchMessages(res.data.data)
      
    })
    .catch(err=>{
      console.log(err.message)
    })
   }

   const most_liked = ()=>{
    var likes_count = []
    messages.map(i=>{
      likes_count.push(i.num_likes)
    })
    
   
    setSearchMessages(messages.filter(i=>i.num_likes == Math.max(...likes_count)))
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


    socket.on('receive_message_changes',(data=>{
      console.log(data)
      get_messages()
    }))
    
   },[socket])

  
 
        return <>
        <div className="chat_window" >
        <button className="btn btn-primary " data-toggle="modal" data-target="#exampleModal" style={{marginLeft:20,marginTop:10,marginBottom:10}}>
        <i class="fa fa-filter"></i>Filter</button>

          <div className="top_menu" >


          <input placeholder="Search Message" onChange={(val)=>search_message(val.target.value)} className="form-control" style={{width:"40%",float:"right",marginRight:20}}/>
         
            <div className="title">Chat</div>
          </div>
          <ul className="messages" ref={messagesEndRef}>
          

          { search_messages?.map((data,index)=>{
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
       


       {/* Modal */}
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
           Filter
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

          <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',padding:15}}>
            <button onClick={most} className="btn btn-primary">Most</button>
          <button onClick={most_liked} className="btn btn-primary">Most Liked Messages</button>

            <button className="btn btn-primary" onClick={least}>Least</button>

          </div>


        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
      </>
      
    }
