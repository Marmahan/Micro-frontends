import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';  //to make the post request

class Post extends React.Component{

    state={
        postid:''
      }
      
 componentDidMount(){
    // let id=this.props.match.params;
    // console.log(id);
 }

render() {
    return (
        <div>Here comes JSX !</div>
    );
}
}

export default Post;