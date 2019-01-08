import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';  //to make the post request

class Login extends React.Component{

    state={
        email:'',
        password:'',
        userlogged:'',
        error:''
      }
      
      handlechange =(e)=>{
        this.setState({
          [e.target.id]:e.target.value
        })
      }
    


      handlesubmit =(e)=>{
        e.preventDefault();
        console.log(this.state)
        axios.post('http://localhost:1114/login',{
          email:this.state.email,
          password:this.state.password
        }).then((response)=>{
          console.log(response);
          if(response.data.length>20){
            this.setState({userlogged:true})
            console.log(response.data);
            this.props.setemail(this.state.email);
            window.location.reload();
          }
          else{                       //the response has errors
            this.setState({
              error:response.data     
            })
            console.log(this.state.error);
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
        <div>
            <div className="card-panel center">
              <form onSubmit={this.handlesubmit}>

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
                    <input type="button" onClick={this.handlesubmit}value="Log in" className="btn"/>
                  </div>

              </form>
             </div>
        </div>
    )
  }
}

export default Login;