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

class Register extends React.Component{

  state={
    name:'',
    email:'',
    password:'',
    usersubmitted:'',
    error:''
  }
  
  handlechange =(e)=>{
    this.setState({
      [e.target.id]:e.target.value
    })
  }

  handlesubmit =(e)=>{
    e.preventDefault();
    //console.log(this.state);
    axios.post('http://localhost:1111/newuser',{
      name:this.state.name,
      email:this.state.email,
      password:this.state.password
    }).then((response)=>{
      if(response.data==1){
        this.setState({usersubmitted:true})
      }
      else{                       //the response has errors
        this.setState({
          error:response.data     
        })
        //console.log(this.state.error);
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
      this.state.usersubmitted ? (   //if message submitted, print a success message to the user
        <div className="container">
          <div className="row">
            <div className="card-panel center">
              <h5 className="center green-text">Account created successfully!</h5>
              <h6 className="center green-text">You may now login</h6>
            </div>
          </div>
        </div>
        ) : ( 
        <div className='container'>
          <div className="row">
            <div className="card-panel center">
              <i className="medium material-icons">email</i>
              <h5 className='center black-text'>Contact us</h5> 
            </div>
          </div>
          <div className="row">
            <div className="card-panel center">
              <form onSubmit={this.handlesubmit}>
                <div className="input-field">
                  <input type="text" name="name" id="name" onChange={this.handlechange}/>
                  <label htmlFor="name">Name</label>
                </div>

                <div className="input-field">
                  <div className="left-align">
                    <input id="email" type="email" className="validate" required="" aria-required="true" onChange={this.handlechange}/>
                      <label htmlFor="email">Email</label>
                  </div>
                </div>

                <div className="input-field">
                  <input type="password" name="password" id="password" onChange={this.handlechange}/>
                  <label htmlFor="password">Password</label>
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

export default Register;