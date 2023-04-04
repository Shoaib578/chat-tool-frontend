import React from 'react'
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link
  } from "react-router-dom";
  import Axios from 'axios'
export default class Channel extends React.Component {
    delete_channel = ()=>{
        Axios.get("http://localhost:5000/apis/channel/delete_channel?channel_id="+this.props.data.channel_id)
        .then(res=>{
            if(res.data.is_deleted){
                this.props.get_all_channels()
            }else{
                alert("Something went wrong")
            }
        })
        .catch(err=>{
            alert("Something went wrong")
        })
    }
    render(){
        return <div>
            <div className="container bg-white text-white p-3 mt-2" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>


            <Link to={`/channel/${this.props.data.channel_id}`}>
            <h4>{this.props.data.name}</h4>

            </Link>

            {this.props.user_id == this.props.data.created_by?<button onClick={this.delete_channel} className='btn btn-danger'>Delete</button>:<div></div>}
        </div>

        </div>
    }
}