import React from "react";
import axios from 'axios';  //to make the post request

class Userposts extends React.Component{
  
  state = {
      posts: []
  } 
  componentDidMount(){
    axios.get('http://localhost:1115/posts')
    .then(res =>{
        this.setState({
            posts: res.data
        })
    })
  }  

render(){
    const {posts} = this.state;
    const plist = posts.length ? (
        posts.map(post =>{
            return (
                <div className="card" key={post._id}>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{post.title}</span>
                            <span className="right">{post.time.replace('T',' ').substring(0, 24-5)}</span>
                            <p>{post.body}</p>
                        </div>
                    </div>

                </div>
            )
        })
    ):(
        <div className="center">
            No posts
        </div>
    )
    return(
        <div>
            {plist}
        </div>
    )
  }
}

export default Userposts;