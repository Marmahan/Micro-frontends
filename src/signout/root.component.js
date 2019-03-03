import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {navigateToUrl} from 'single-spa'

class Signout extends React.Component{
  
  //once this app is active it expires the cookies and go to the home page
  componentDidMount (){
    location.reload('');//refresh the page
    document.cookie = 'email' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //set both cookies to an expired date
    document.cookie = 'jwt' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';//then browser will delete them
    navigateToUrl('/');//go to the home page

  }

  render(){
    return(
      <div className='container'>

      </div>
    )
  }
}

export default Signout;