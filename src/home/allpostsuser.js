import React from "react";
import axios from 'axios';  //to make the post request
import Comment from "./comment";
import Allcomments from './allcomments';
import { confirmAlert } from 'react-confirm-alert'; // for the alert

//Bring all posts from the DB for a specific user
//also have edit one post, delete one post

class Allpostsuser extends React.Component{
  
  state = {
      posts: [],
      thereIsApost:false, //if it is true then the app will show one post, 
      //if it is false then the app will show all the posts 
      post:'',
      postid:'',
      hover:false,
      editapost:false,
      title:'',
      body:'',
      edited:false,//post is not in edit mode, so don't show anything related to edit
      postdeleted:false //post is not in the delete mode, so don't show anything related to delete. MAYBE not needed
  } 

  //Bring all the posts from the posts service and store them in the state
  componentDidMount(){
    var headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +  this.getCookie('jwt')
    }

    axios.get('http://localhost:1115/allpostsbyuser', {"headers" : headers})
    .then(res =>{
        this.setState({
            posts: res.data
        })
    })
  }  

  getCookie = (name)=> {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  
  //Bring the post that was clicked and store it in the state
setpost =(e)=>{
    this.setState({
        postid:e
    })
    //console.log(e)
    this.setState({
        thereIsApost : true
    })
    //get a post
    axios.get('http://localhost:1115/post/'+e)
    .then(res =>{
        //console.log(res.data[0])
        this.setState({
            post: res.data[0],
            postid:res.data[0]._id,
            title: res.data[0].title,
            body:res.data[0].body
        })
    })

}
//not sure if refresh the page sets the state back to default
backhome =()=>{
    //refresh the page
    location.reload();

}

//set the hover state true
//when hover state is true, delete and update icons will be displayed
hoverOn =()=>{
    this.setState({ hover: true });
  }

  //set the hover state false
  hoverOff=()=>{ 
    this.setState({ hover: false });    
  }

  //actually edit the post
  handleedit=()=>{
    
    var headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +  this.getCookie('jwt')
    } 
    //the state has the id of the post
    axios.put('http://localhost:1115/editpost/'+this.state.postid.toString(),
    {
        title:this.state.title,
        body:this.state.body
    },{"headers" : headers}
    )
    .then(res =>{
        this.setState({
            edited:true //so show a message of successful editing
        })
        //Refresh the page after two seconds of showing the successful message
        setTimeout(()=>{
            location.reload();
          },2000)
    })
  }

  //set the state according to the input of the user
  handlechange =(e)=>{
    this.setState({
        [e.target.id]:e.target.value
    })
  }

  //edit a post, basically show the edit form
  editpost =()=>{
      this.setState({
          //when this is true, it means show the edit form
          editapost:true
      });

  }

  //delete a post
  deletepost=()=>{
        confirmAlert({
          message: 'Are you sure to delete this post?',
          buttons: [
            {
              label: 'Yes',
              //if yes
              onClick: () => {
                //header for the jwt access rights
                var headers = {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " +  this.getCookie('jwt')
                } 
                //the state has the id of the post
                axios.delete('http://localhost:1115/deleteapost/'+this.state.postid.toString(), {"headers" : headers})
                .then(res =>{
                    console.log('post has been deleted');
                    //show a confirmation message and refresh the screen
                    Materialize.toast("Post has been deleted", 1000 , 'red rounded')
                    setTimeout(()=>{
                        location.reload();
                      },1000)
                })
              }
            },
            {
              //don't do anything
              label: 'No'
            }
          ]
        })
  }

render(){
    /* Bring all the posts from the data base and stor them in plist*/
    const {posts} = this.state;
    const plist = posts.length ? ( //if there are posts, bring them to the plist
        posts.map(post =>{
            return (    //store the posts in plist
                <div>
                    <div className="card" key={post._id}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text" >
                                <span className="card-title"><a  style={{cursor: 'pointer'}} onClick={() => {this.setpost(post._id)}}>{post.title}</a></span>
                                <span style={{fontSize:'11px', marginLeft:'10px'}}>{post.date.replace('T',' ').substring(0, 24-5)}</span>
                                <span className="right">{post.writer}</span>
                                <p>{post.body}</p>
                            </div>
                        </div>

                    </div>

                </div>
            )
        })
    ):( //No posts are found so plist is empty
        <div className="center">
              <div className="row">
                <div className="col s12 m12">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                        <span className="card-title"></span>
                        <p>No posts yet!!</p>
                        </div>
                        <div className="card-action"></div>
                    </div>
                </div>
            </div>
        </div>
    )
    return(
        //if editapost is true then either show a post was edited successfuly, 
        //or show the edit form
        this.state.editapost ? (
            this.state.edited? ( //show a post was edited successfuly

                <div className="container">
                    <div className="row">
                        <div className="card-panel center">
                            <h5 className="center green-text">Post Edited!</h5>
                            <h6 className="center green-text">:)</h6>
                        </div>
                    </div>
                </div>             

            ):(//show the edit form
                <div className='container'>
                    <div className="row">
                        <div className="card-panel center">
                            <i className="medium material-icons">edit</i>
                            <h5 className='center black-text'>Edit The Post</h5> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="card-panel center">
                            <form onSubmit={this.handlesubmit}>
                            <div className="input-field">
                                <input type="text" name="title" id="title" defaultValue={this.state.post.title} onChange={this.handlechange}/>
                                <label htmlFor="title" className="active">Title</label>
                            </div>
                            {/* active classname so the text doesn't overlap the value for both the title and the body */}
                            <div className="input-field">
                                <textarea  name="body" id="body" className="materialize-textarea" defaultValue={this.state.post.body} onChange={this.handlechange}/>
                                <label htmlFor="body" className="active">Post Content</label>
                            </div>

                            <div className="left-align">  {/* This div wrapper is necessary for the left alignment */}
                                <input type="button" onClick={this.handleedit} value="Edit" className="btn"/>
                            </div>
                            </form>

                        </div>
                    </div>
                </div>
            )
        ):( //editpost is false so go normally. Either show one post, or all posts
            this.state.thereIsApost ? (   //show one post

                <div>
                    <div className="card">
                        <div className="card blue-grey darken-1">
                                {/* Show the options for the user if they hover over a text */}
                            <div className="card-content white-text" 
                            onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
                                <span className="card-title">{this.state.post.title}</span>
                                <span style={{fontSize:'11px', marginLeft:'10px'}}>{this.state.post.date}</span>
                                <span className="right">{this.state.post.writer}</span>
                                <p>{this.state.post.body}</p>
                                <br />
                                {
                                  //if hover is true, then show delete and update icons  
                                  this.state.hover? (
                                        <div>
                                            <i className=" material-icons useroptioncolor" onClick={this.deletepost}>delete</i>
                                            <i className=" material-icons useroptioncolor" onClick={this.editpost}>mode_edit</i>
                                        </div>
                                    ):(
                                        <div>
                                            
                                        </div>
                                    )
                                }

                            </div>
                        </div>    
                    </div>

                    {/* to type a comment */}
                    < Comment postid={this.state.post._id}/>

                    {/* to show all comments*/}
                    < Allcomments postid={this.state.postid}/>

                    {/* Go back home and show all posts*/}
                    <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.backhome}><i className="material-icons">home</i></a>
               
                </div>
            ) : (   // all the previous conditions are not met so show all posts
                <div>{plist}</div>
            )
        )

    )
  }
}

export default Allpostsuser;