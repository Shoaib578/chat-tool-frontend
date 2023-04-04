import React from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link
  } from "react-router-dom";
import Axios from 'axios'

export default class Signin extends React.Component {
  state = {
    email:"",
    password:""
  }
  signin = ()=>{
    let formData = new FormData()
    formData.append("email",this.state.email)
    formData.append("password",this.state.password)

    Axios.post("http://localhost:5000/apis/user/signin",formData)
    .then(res=>{
      console.log(res)
      if(res.data.is_loggedin){
        localStorage.setItem('user',JSON.stringify(res.data.user))
        window.location = "/"
      }else{
        alert("Invalid Email or Password")
      }
    })
    .catch(err=>{
      alert(err.message)
    })
  }

  is_logged_in = ()=>{
    const storage = localStorage.getItem('user')
    const parse = JSON.parse(storage)

    if(storage){
      if(parse.is_admin == 1){
        window.location='/admin/'

      }else{
        window.location='/home'
      }
    }
  }

  componentDidMount(){
    this.is_logged_in()
  }
    render(){

     return <>
         
      
     
         <section className="vh-100" id="auth_form">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
             
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    onChange={(val)=>this.setState({email:val.target.value})}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    onChange={(val)=>this.setState({password:val.target.value})}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>
                
                {/* Submit button */}
                <button type="submit" onClick={this.signin} className="btn btn-primary btn-lg btn-block">
                  Sign in
                </button>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                <Link to={'/signup'}>Dont have any account want to signup?</Link>
               
              
            </div>
          </div>
        </div>
      </section>
      </>
      
    }
}