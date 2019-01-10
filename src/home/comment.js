import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';  //to make the post request

// Show a form so users could make comments

class Comment extends React.Component{

    state={
        email:'',
        commentbody:'',
        commentsubmitted:''
      }
      
 handlechange =(e)=>{
     this.setState({
         [e.target.id]:e.target.value
     })
 }

 handlesubmit =(e)=>{
     e.preventDefault();
     //console.log(this.state)
     axios.post('http://localhost:1116/newcomment',{
        postID:this.props.postid,
        email:this.state.email,
        commentbody:this.state.commentbody
      }).then((response)=>{
        if(response.data==1){
          this.setState({commentsubmitted:true})
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

render() {
    return (
        this.state.commentsubmitted ? (//if comment is submitted then show this comment
            <div className="card">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{this.state.email}</span>
                        <p>{this.state.commentbody}</p>
                    </div>
                </div>
            </div>
        ) : (               //comment is not submitted yet, then show the form to submit a comment
            <div className="row">
                <form onSubmit={this.handlesubmit}>
                    <div className="input-field">
                        <div className="left-align">
                            <input id="email" type="email" className="validate" required={true} aria-required="true" onChange={this.handlechange}/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>

                    <div className="input-field">
                        <textarea id="commentbody" className="materialize-textarea" required={true} onChange={this.handlechange}></textarea>
                        <label htmlFor="commentbody">Textarea</label>
                    </div>

                    <div className="left-align">  {/* This div wrapper is necessary for the left alignment */}
                        <input type="submit"  value="Send" className="btn"/>
                    </div>
                </form>
            </div>
        )

    );
}
}

export default Comment;