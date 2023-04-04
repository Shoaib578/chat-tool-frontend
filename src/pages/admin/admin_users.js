import React from 'react'
import Navbar from './navbar'
import  Axios  from 'axios'

export default class AdminUsers extends React.Component {
    state = {
        users:[]
    }
    get_all_users = ()=>{
        Axios.get("http://localhost:5000/apis/admin/get_all_users")
        .then(res=>{
            this.setState({users:res.data.data})
        })
        .catch(err=>{
            if(err)throw err
        })
    }

    delete_user = (id)=>{
        Axios.get("http://localhost:5000/apis/admin/delete_user?user_id="+id)
        .then(res=>{
            this.get_all_users()
        })
        .catch(err=>{
            alert(err.message)
        })
    }

    componentDidMount(){
        this.get_all_users()
    }
    render(){
        return (
            <div>
                <Navbar />
                

                <center className='bg-white'>
                    <h1>All Users</h1>
                </center>

                <table className="table" >
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">#</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user,index)=>{
                            return <tr key={index}>
                            <th scope="row">{user.user_id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={()=>this.delete_user(user.user_id)} className='btn btn-danger'>Delete</button>
                            </td>
                            
                            </tr>
                        })}
                        
                     
                    </tbody>
                    </table>
            </div>
        )
    }
}