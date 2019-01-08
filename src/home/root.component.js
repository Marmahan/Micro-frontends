import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from './login';
import Allposts from './allposts';
import Post from './post';


class Home extends React.Component{
  state={
    email: document.cookie || '',
    islogged:''
  }



  setemail =(v)=>{
    this.setState({
      email: this.state.email.concat(v)
    },() => {
      //localStorage.setItem('email', JSON.stringify(this.state.email))
      var date = new Date();
      var min=1;
      date.setTime(date.getTime() + (min * 60 * 1000)); //1 min
      window.document.cookie = 'email' + "=" + this.state.email + "; expires=" + date.toGMTString();
      //document.cookie=this.state.email;
    });
  }

  render(){

        return(
              this.state.email ? (
                  <div className="container">
                    <h1>Logged in successfuly {this.state.email.split('=').pop()}</h1>
                    <h5>It should show all the posts of the specific user</h5>
                    <Allposts />
                  </div>
                ):
                ( 
      
                  <div className="container">
                    <Allposts />
                  </div>
                  
                )
        )

  }
}

export default Home;