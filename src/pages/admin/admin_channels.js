import React from 'react';
import Navbar from './navbar';
import Axios from 'axios'

export default class AdminChannels extends React.Component {
    state = {
        channels:[]
    }
    get_all_channels =()=>{
        Axios.get("http://localhost:5000/apis/admin/get_all_channels")
        .then(res=>{
            console.log(res.data.data)
            this.setState({channels:res.data.data})
        })
        .catch(err=>{
            if(err)throw err
        })
    }

    delete_channel = (id)=>{
        Axios.get("http://localhost:5000/apis/admin/delete_channel?channel_id="+id)
        .then(res=>{
            this.get_all_channels()
        })
        .catch(err=>{
            alert(err.message)
        })
    }
    componentDidMount(){
        this.get_all_channels()
    }
    render(){
        return(
            <>
            <Navbar />

            <center className='bg-white'>
                <h1>All Channels</h1>
            </center>
            <table className="table" >
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Channel Name</th>
                        <th scope="col">Added by</th>
                        

                        <th scope="col">#</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.channels.map((channel,index)=>{
                           return  <tr key={index}>
                            <th scope="row">{channel.channel_id}</th>
                            <td>{channel.name}</td>
                            <td>{channel.created_by}</td>
                            
                            <td>
                                <button onClick={()=>this.delete_channel(channel.channel_id)} className='btn btn-danger'>Delete</button>
                            </td>
                            
                            </tr>
                        })}
                       
                     
                    </tbody>
                    </table>
            </>
        )
    }
}