import React from "react";
import axios from 'axios';  //to make the post request

//Show all the comments of a specific post

class Allcomments extends React.Component{
  
  state = {
      comments: [],
  } 

  //Bring all the posts from the posts service and store them in the state
  componentDidMount(){
    axios.get('http://localhost:1116/comments/'+this.props.postid)
    .then(res =>{
        this.setState({
            comments: res.data
        })
    })
  }  

render(){
    /* Bring all the comments from the data base and stor them in clist*/
    const {comments} = this.state;
    const clist = comments.length ? (
        comments.map(comment =>{
            return (    //store the comments in clist
                <div >
                    <div className="card col s8 z-depth-4" style={{padding:'0px'}} key={comment._id}>
                        <div className="card blue-grey darken-4 darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">{comment.email}</span>
                                <span style={{fontSize:'11px', marginLeft:'10px'}}>{comment.time.replace('T',' ').substring(0, 24-5)}</span>
                                <p>{comment.commentbody}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s4"></div>
                </div>
            )
        })
    ):( //No comments are found so clist is empty
        <div className="center">
           
        </div>
    )
    return(
        //<div className="container">
            <div className="container">{clist}</div> 
        //</div>
            
    )
  }
}

export default Allcomments;