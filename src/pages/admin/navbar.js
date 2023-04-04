import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  is_logged_in = ()=>{
    const storage = localStorage.getItem('user')
    const parse = JSON.parse(storage)

    if(storage){
      if(parse.is_admin == 1){
        return true
      }else{
        window.location='/home'
      }
    }else{
      window.location='/signin'

    }
  }

  logout = ()=>{
    localStorage.removeItem('user')
    window.location = '/signin'
  }

  componentDidMount(){
    this.is_logged_in()
  }
    render(){
        return <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{paddingLeft:10}}>
        <a class="navbar-brand" href="#">Chat-tool-Admin</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
            <Link class="nav-link" to={'/admin/'}>Home </Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to={'/admin/channels'}>Channels</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to={'/admin/messages'}>Messages</Link>
            </li>

            <li class="nav-item">
            <Link class="nav-link" to={'/admin/replies'}>Replies</Link>
            </li>

            <li class="nav-item">
              <button class="btn btn-danger nav-link" onClick={this.logout}>Logout</button>
            </li>
          
          </ul>
        </div>
      </nav>
      
    }
}