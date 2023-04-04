import React from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link
  } from "react-router-dom";

import Axios from 'axios'

export default class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
  
    profile_image: ""
  }
  validate = ()=>{
    if(this.state.name === ""){
      alert("Please enter your name");
      return false;
    }
    if(this.state.email === ""){
      alert("Please enter your email");
      return false;
    }
    if(this.state.password === ""){
      alert("Please enter your password");
      return false;
    }
    if(this.state.profile_image === ""){
      alert("Please enter your profile image");
      return false;
    }
    return true;
  }


  signup =()=>{
    if(!this.validate()){
      return;
    }

    let formData = new FormData();
    formData.append("name",this.state.name);
    formData.append("email",this.state.email);
    formData.append("password",this.state.password);
    formData.append("profile_image",this.state.profile_image);
    Axios.post("http://localhost:5000/apis/user/signup",formData)
    .then(res=>{
      if(res.data.is_registered){
        alert("Signup successful")
      }else{
        alert("Email already exists please try again")
        
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
        return <section className="vh-100">
          
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
             


                {/* Profile Image input */}
                <div className="form-outline mb-4">
                  <input
                    type="file"
                    id="form1Example13"
                    onChange={(val)=>this.setState({profile_image:val.target.files[0]})}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Profile Image
                  </label>
                </div>

                 {/* Name input */}
                 <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form1Example13"
                    onChange={(val)=>this.setState({name:val.target.value})}

                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Name
                  </label>
                </div>


                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    onChange={(val)=>this.setState({email:val.target.value})}

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
                    className="form-control form-control-lg"
                    onChange={(val)=>this.setState({password:val.target.value})}
                    
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>
                
                {/* Submit button */}
                <button onClick={this.signup} type="submit" className="btn btn-primary btn-lg btn-block">
                  Sign up
                </button>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                <Link to={'/signin'}>Already have any account want to signin?</Link>
               
             
            </div>
          </div>
        </div>
      </section>
    }
}