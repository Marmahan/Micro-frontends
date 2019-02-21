// src/navBar/root.component.js

import React from 'react'
import {navigateToUrl} from 'single-spa'
import logo from './logo.png';

class NavBar extends React.Component{

  state={
    email: document.cookie || ''
  }

  render(){
    return(
      this.state.email ?( //user is signed in
        <nav>
        <div className="nav-wrapper indigo lighten-1">
          <a href="/" onClick={navigateToUrl} className="brand-logo">
           <img className="blog-logo" src={logo} />
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/" onClick={navigateToUrl}>Home</a></li>
            <li><a href="/newpost" onClick={navigateToUrl}>New Post</a></li>
            <li><a href="/about" onClick={navigateToUrl}>About</a></li>
            <li><a href="/contactus" onClick={navigateToUrl}>Contact us</a></li>
            <li><a href="/contactus" onClick={navigateToUrl}>Logout {this.state.email.split('=').pop()}</a></li>
          </ul>
        </div>
      </nav>
      ):(       //user is not signed in
        <nav>     
        <div className="nav-wrapper indigo lighten-1">
          
          <a href="/" onClick={navigateToUrl} className="brand-logo ">
            <img className="blog-logo" src={logo} />
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/" onClick={navigateToUrl}>Home</a></li>
            <li><a href="/signin" onClick={navigateToUrl}>Sign in</a></li>
            <li><a href="/register" onClick={navigateToUrl}>New User</a></li>
            <li><a href="/about" onClick={navigateToUrl}>About</a></li>
            <li><a href="/contactus" onClick={navigateToUrl}>Contact us</a></li>
          </ul>
        </div>
      </nav>
      )

    )
  }

}

// const NavBar = () => (
//   <nav>
//     <div className="nav-wrapper">
//       <a href="/" onClick={navigateToUrl} className="brand-logo">single-spa</a>
//       <ul id="nav-mobile" className="right hide-on-med-and-down">
//         <li><a href="/" onClick={navigateToUrl}>Home</a></li>
//         <li><a href="/register" onClick={navigateToUrl}>New User</a></li>
//         <li><a href="/signin" onClick={navigateToUrl}>Sign In</a></li>
//         <li><a href="/about" onClick={navigateToUrl}>About</a></li>
//         <li><a href="/contactus" onClick={navigateToUrl}>Contact us</a></li>
//       </ul>
//     </div>
//   </nav>
// )

export default NavBar