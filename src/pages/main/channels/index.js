import React from "react";
import Channel from "../../../components/channel";
import Axios from 'axios'
import { Navigate } from "react-router-dom";
const storage = localStorage.getItem('user')
const parse = JSON.parse(storage)

export default class Channels extends React.Component {
    state = {
        channel_name:"",
        channels:[]
    }

    logout=()=>{
        localStorage.removeItem('user')
       window.location = "/signin"
    }

    add_channel = ()=>{
        if(this.state.channel_name.length<1){
            alert("Please enter channel name")
            return 
        }

        let formData = new FormData()
        formData.append("channel_name",this.state.channel_name)
        formData.append("user_id",parse.user_id)
        Axios.post("http://localhost:5000/apis/channel/add_channel",formData)
        .then(res=>{
            if(res.data.is_created){
                alert("Channel created")
            }else{
                alert("Something went wrong")

            }
        })
        .catch(err=>{
            alert(err.message)
        })
    }

    get_all_channels = ()=>{
        Axios.get("http://localhost:5000/apis/channel/get_all_channels")
      .then(res=>{
        this.setState({channels:res.data.data})
      })
      .catch(err=>{
        this.setState({channels:[]})
      })
    }

    is_loggedin = ()=>{
        if(!localStorage.getItem('user')){
          window.location = '/signin'
    
        }
    }
    
      

    componentDidMount(){
        this.is_loggedin()
        this.get_all_channels()

    }
    render(){
        return <div>

        <div className="container bg-light p-5 " style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
                <button onClick={this.logout} className="btn btn-danger">Logout</button>
                <button className="btn btn-primary"  data-toggle="modal" data-target="#exampleModal">Add Channel</button>

        </div>

        <br />
        
        <h2 className="text-primary container">Channels</h2>
        
        {this.state.channels.map((data,index)=>{
            return  <Channel data={data} get_all_channels={this.get_all_channels} user_id={parse.user_id} key={index}/>
        })}
        
       



        {/* Modal */}
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Channel</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    onChange={(val)=>this.setState({channel_name:val.target.value})}
                                    id="form1Example13"
                                    className="form-control form-control-lg"
                                />
                                <label className="form-label" htmlFor="form1Example13">
                                Channel Name
                                </label>
                                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.add_channel} class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>




        </div>
    }
}