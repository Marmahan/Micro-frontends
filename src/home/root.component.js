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
import Allpostsuser from './allpostsuser';



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

  getCookie = (name)=> {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  render(){

        return(
              this.state.email ? (
                  <div className="container">
                    <br />
                    <div className="welcomemsgparent">
                      <h4 className="welcomemsg">Welcome {this.getCookie('email')}</h4>
                      <div className="fade_rule"></div>  
                    </div>
                    <Allpostsuser />{/* This brings all posts of the logged in user */}
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






