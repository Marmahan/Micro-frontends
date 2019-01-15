import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';  //to make the post request

class Newpost extends React.Component{

  state={
    title:'',
    body:'',
    postsubmitted:'',
    error:''
  }
  //to get the jwt from the cookie must be passed as getCookie('jwt')
  getCookie = (name)=> {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  handlechange =(e)=>{
    this.setState({
      [e.target.id]:e.target.value
    })
  }

  handlesubmit =(e)=>{
    var headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " +  this.getCookie('jwt')
  }
    console.log(this.getCookie('email'));
    axios.post('http://localhost:1115/newpost/' + this.getCookie('email'),{
      title:this.state.title,
      body:this.state.body
    }, {"headers" : headers}).then((response)=>{
      if(response.data==1){
        this.setState({
          postsubmitted:'true' //set the post as submitted
        });
      }
      else{
        this.setState({
          error:response.data
        });
        {
          this.state.error ? (  //show the response error
            Materialize.toast(this.state.error, 3000 , 'red rounded'),
            this.setState({     //clear the error
              error:''
            })
          ) : null
        }
      }
    })
  }


  render(){
    return(
      this.state.postsubmitted ? (   //if message submitted, print a success message to the user
          <div className="container">
            <div className="row">
              <div className="card-panel center">
                <h5 className="center green-text">Post submitted!</h5>
                <h6 className="center green-text">:)</h6>
              </div>
            </div>
          </div>
      ) : (                             //otherwise keep showing the form
            <div className='container'>
            <div className="row">
              <div className="card-panel center">
                <i className="medium material-icons">email</i>
                <h5 className='center black-text'>New Post</h5> 
              </div>
            </div>
            <div className="row">
              <div className="card-panel center">
                <form onSubmit={this.handlesubmit}>
                  <div className="input-field">
                    <input type="text" name="title" id="title" onChange={this.handlechange}/>
                    <label htmlFor="title">Title</label>
                  </div>

                  <div className="input-field">
                    <textarea  name="body" id="body" className="materialize-textarea" onChange={this.handlechange}/>
                    <label htmlFor="body">Post Content</label>
                  </div>

                  <div className="left-align">  {/* This div wrapper is necessary for the left alignment */}
                    <input type="button" onClick={this.handlesubmit}value="Send" className="btn"/>
                  </div>
                </form>

              </div>
            </div>
          </div>
      )

    )
  }
}

export default Newpost;