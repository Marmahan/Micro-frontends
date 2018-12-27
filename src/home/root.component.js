import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class Home extends React.Component{
  state={
    name: 'Ryue'
  }
  render(){
    return(
      <div>
        <h1>Hey from {this.state.name}</h1>
      </div>
    )
  }
}

export default Home;