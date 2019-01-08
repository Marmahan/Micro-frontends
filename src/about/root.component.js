import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


class About extends React.Component{
  
  render(){
    return(
      <div className='container'>
        <h1 className='center black-text'>About</h1>
        <p className="flow-text">Micro frontends Website. It is composed of three react apps:</p>
        <u style={{ textDecoration: 'none' }}>
          <li style={{ fontSize: '18px', marginLeft: '30px' }}>Navigation bar (app)</li>
          <li style={{ fontSize: '18px', marginLeft: '30px' }}>Todo app</li>
          <li style={{ fontSize: '18px', marginLeft: '30px' }}>About app</li>
        </u>
        <p className="flow-text">Maecenas dignissim tellus et nulla mattis efficitur. Morbi quis ipsum nisi. Sed consequat fringilla neque eu tristique. Proin eget aliquet tellus. Praesent libero nibh, semper et velit dapibus, accumsan dapibus quam. Cras facilisis magna at leo pellentesque, quis vehicula nulla maximus. Mauris ut diam venenatis, euismod mauris eu, commodo mauris. Praesent finibus a augue a semper. Nunc vulputate nunc id elementum rhoncus. Nam metus lectus, hendrerit ac diam at, dignissim vulputate odio. Morbi semper faucibus justo, a aliquam metus tincidunt nec. Ut placerat malesuada massa, id lacinia nibh placerat vitae. Praesent tellus mauris, consectetur sed porta vel, consequat eget ex. Sed tincidunt turpis a est elementum, a malesuada elit tincidunt.</p>
      </div>
    )
  }
}

export default About;