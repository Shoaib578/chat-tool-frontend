import React, { useEffect, useState } from 'react'
import socketIO from 'socket.io-client';
import Axios from 'axios'
const socket = socketIO.connect('http://localhost:5000');

export default function Message(props){
    const [want_to_reply,setWanttoReply] = useState(false)
    const [reply_message,setReplyMessage]= useState("")
    const [all_replies,setReplies] = useState([])
    const [TempRelies,setTempReplies]= useState([])
    
    const reply = ()=>{
        socket.emit('reply',{
            "message_id":props.data.message_id,
            "reply_message":reply_message,
            "replied_by":props.user_id,
            "channel_id":props.data.channel
        })
        get_all_replies()
       
    }

    const get_all_replies = ()=>{
        Axios.get("http://localhost:5000/apis/message/get_messages?channel_id="+parseInt(window.location.pathname.split("/")[2]))
        .then(res=>{
             let temp_replies = []
            if(res.data.replies.length>0){
                res.data.replies.filter(r=>{
                    if(r.msg_id == props.data.message_id){
                        temp_replies.push(r)
                    }
                })
    
                setReplies(temp_replies)
            }
            
        })
        .catch(err=>{
          console.log(err.message)
        })
    }

    const get_filtered_props_replies = ()=>{
        let temp_replies = []
        if(props.replies.length>0){
            props.replies.filter(r=>{
                if(r.msg_id == props.data.message_id){
                    temp_replies.push(r)
                }
            })

            setReplies(temp_replies)
        }
    }

  


    useEffect(()=>{
       
        socket.on('receive_replies',(data=>{
      
          get_all_replies()
        
        }))
  
    },[socket])

    useEffect(()=>{
        get_filtered_props_replies()
    },[])
   
   
    return <li className={`message ${props.data.added_by == props.user_id?'right':'left'}`}>
            
    <div className="text_wrapper">
    <div className="avatar" >
    {props.data.profile_image != null?<img src={`http://localhost:5000/uploads/${props.data.profile_image}`} style={{width:60,height:60,borderRadius:60}}/>:<b style={{color:'red',fontSize:10}}>user-deleted</b>}

    </div>
      <div className="text mt-3" >
           &nbsp;{props.data.message}
        </div>
        <br />
        
        {all_replies.map((reply,index)=>{
            return  <div key={index} style={{backgroundColor:"white",marginTop:3}}>
            <p>{reply.name !=null?<b>{reply.replied_by==props.user_id?'Me : ':reply.name+' : '} </b>:<b style={{color:'red'}}>None-user-deleted : </b> }  {reply.reply_message}</p>
            </div>
        })}
       


        <br />
        {want_to_reply? <input className='form-control ' onChange={(val)=>setReplyMessage(val.target.value)} style={{float:'left',width:'80%'}} placeholder='Reply'/>:<div></div>}
        {want_to_reply == false?<button onClick={()=>setWanttoReply(!false)} className="btn btn-primary " style={{float:'right'}}>Reply</button>:<button className="btn btn-primary " onClick={reply} style={{float:'right'}}>Submit</button>}
        
      
    </div>
  </li>
}