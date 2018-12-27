import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Todo from './Todo';
import Addtodo from './Addtodo'

class Home extends React.Component{
  state={
    todos:[
      {id:1, content: 'Create a working micro frontends app'},
      {id:2, content: 'Work out a little bit'}
    ]
  }

  deleteTodo = (id) =>{
    const newtodos = this.state.todos.filter(todo => {
      return todo.id !== id
    })
    this.setState({
      todos:newtodos
    })
  }

  render(){
    return(
      <div className='todoapp container'>
        <h1 className='center blue-text'>Todo's</h1>
        <Todo todos={this.state.todos} deleteTodo={this.deleteTodo} />
        <Addtodo />
      </div>
    )
  }
}

export default Home;