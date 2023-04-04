import React from 'react'
import Navbar from './navbar'
import Axios from 'axios'
export default class AdminMessages extends React.Component {
    state = {
        messages:[]
    }
    get_all_messages =()=>{
        Axios.get("http://localhost:5000/apis/admin/get_all_messages")
        .then(res=>{
           
            this.setState({ messages:res.data.data})
        })
        .catch(err=>{
            if(err)throw err;

        })
    }

    delete_message = (id)=>{
        Axios.get(`http://localhost:5000/apis/admin/delete_message?message_id=${id}`)
      .then(res=>{
        this.get_all_messages()
      })
      .catch(err=>{
        alert(err.message)
      })
    }

    componentDidMount(){
        this.get_all_messages()
    }
    render(){
        return (
            <div>
                <Navbar />
                <center className='bg-white'>
                <h1>All Messages</h1>
                </center>
                <table className="table" >
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Message</th>
                        <th scope="col">User id</th>
                        <th scope="col">Channel Id</th>

                        <th scope="col">#</th>
                       
                        </tr>
                    </thead>
                    <tbody>


                        {this.state.messages.map((message,index)=><tr key={index}>
                        <th scope="row">{message.message_id}</th>
                        <td>{message.message}</td>
                        <td>{message.added_by}</td>
                        <td>{message.channel}</td>

                        <td>
                            <button onClick={()=>this.delete_message(message.message_id)} className='btn btn-danger'>Delete</button>
                        </td>
                        
                        </tr>)}
                     
                    </tbody>
                    </table>
            </div>
        )
    }
}