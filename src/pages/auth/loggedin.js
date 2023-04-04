import React from 'react'


import { Spinner } from "react-activity";
import "react-activity/dist/library.css";


export default class Loggedin extends React.Component {
  
  is_logged_in = ()=>{
    const storage = localStorage.getItem('user')
    const parse = JSON.parse(storage)

    if(storage){
      if(parse.is_admin == 1){
        window.location='/admin/'

      }else{
        window.location='/home'
      }
    }else{
      window.location='/signin'

    }
  }

  componentDidMount(){
    this.is_logged_in()
  }
    render() {
           
          
    
        
       return(
           <center>
            <Spinner  size={40} style={{marginTop:300}}/>
           </center>
       )
    }
}

