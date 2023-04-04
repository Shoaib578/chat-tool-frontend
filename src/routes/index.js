import React from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    redirect
  } from "react-router-dom";
import Signin from "../pages/auth/sign_in";
import Signup from "../pages/auth/sign_up";
import Channels from "../pages/main/channels";
import ViewChannel from "../pages/main/channels/view_channel";
import Loggedin from "../pages/auth/loggedin";
import AdminChannels from "../pages/admin/admin_channels";
import AdminUsers from "../pages/admin/admin_users";
import AdminMessages from "../pages/admin/admin_messages";
import AdminReplies from "../pages/admin/admin_replies";

export default class Routes extends React.Component {



    render(){
     

        return <Router>
              <Switch>
                <Route exact path="/"  element={<Loggedin />}/>
                <Route exact path='/home' element={<Channels />}/>
                <Route exact path='/channel/:id' element={<ViewChannel />}/>
                <Route exact path='/signin' element={<Signin />}/>
                <Route exact path='/signup' element={<Signup />}/>

               {/* Admin Routes */}

               <Route exact path='/admin/' element={<AdminUsers />}/>

               <Route exact path='/admin/channels' element={<AdminChannels />}/>

               <Route exact path='/admin/messages' element={<AdminMessages />}/>

               <Route exact path='/admin/replies' element={<AdminReplies />}/>

      
              </Switch>
            </Router>
    }
  

}