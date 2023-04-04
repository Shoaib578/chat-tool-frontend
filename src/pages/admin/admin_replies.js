import React from 'react'
import Navbar from './navbar'
import Axios from 'axios'
export default class AdminReplies extends React.Component {
    state = {
        replies:[]
    }
    get_all_replies =()=>{
        Axios.get("http://localhost:5000/apis/admin/get_all_replies")
        .then(res=>{
           
            this.setState({ replies:res.data.data})
        })
        .catch(err=>{
            if(err)throw err;

        })
    }

    delete_reply = (id)=>{
        Axios.get(`http://localhost:5000/apis/admin/delete_reply?reply_id=${id}`)
      .then(res=>{
        this.get_all_replies()
      })
      .catch(err=>{
        alert(err.message)
      })
    }

    componentDidMount(){
        this.get_all_replies()
    }
    render(){
        return (
            <div>
                <Navbar />
                <center className='bg-white'>
                <h1>All Messages Replies</h1>
                </center>
                <table className="table" >
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Reply</th>
                        <th scope="col">Message ID</th>
                        <th scope="col">#</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.replies.map((reply,index)=>{
                            return   <tr key={index}>
                            <th scope="row">{reply.reply_id}</th>
                            <td>{reply.reply_message}</td>
                            <td>{reply.msg_id}</td>
                            <td>
                                <button onClick={()=>this.delete_reply(reply.reply_id)} className='btn btn-danger'>Delete</button>
                            </td>
                            
                            </tr>
                        })}
                      
                     
                    </tbody>
                    </table>
            </div>
        )
    }
}