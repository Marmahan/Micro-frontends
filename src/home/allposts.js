import React from "react";
import axios from 'axios';  //to make the post request
import Comment from "./comment";
import Allcomments from './allcomments';

//Bring all posts from the DB

class Allposts extends React.Component{
  
  state = {
      posts: [],
      thereIsApost:false, //if it is true then the app will show one post, 
      //if it is false then the app will show all the posts 
      post:'',
      postid:''
  } 

  //Bring all the posts from the posts service and store them in the state
  componentDidMount(){
    axios.get('http://localhost:1115/posts')
    .then(res =>{
        this.setState({
            posts: res.data
        })
    })
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
    axios.get('http://localhost:1115/post/'+e)
    .then(res =>{
        //console.log(res.data[0])
        this.setState({
            post: res.data[0],
            postid:res.data[0]._id
        })
    })

}
//clears the state that there is no post so all posts are shown
backhome =()=>{
    this.setState({
        thereIsApost:false
    })
}

render(){
    /* Bring all the posts from the data base and stor them in plist*/
    const {posts} = this.state;
    const plist = posts.length ? (
        posts.map(post =>{
            return (    //store the posts in plist
                <div className="card" key={post._id}>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title"><a  style={{cursor: 'pointer'}} onClick={() => {this.setpost(post._id)}}>{post.title}</a></span>
                            <span style={{fontSize:'11px', marginLeft:'10px'}}>{post.date.replace('T',' ').substring(0, 24-5)}</span>
                            <span className="right">{post.writer}</span>
                            <p>{post.body}</p>
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
            this.state.thereIsApost ? (   //show one post
                <div>
                    <div className="card">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">{this.state.post.title}</span>
                                <span style={{fontSize:'11px', marginLeft:'10px'}}>{this.state.post.date}</span>
                                <span className="right">{this.state.post.writer}</span>
                                <p>{this.state.post.body}</p>
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
            ) : (   //show all posts
                <div>{plist}</div>
            )
    )
  }
}

export default Allposts;