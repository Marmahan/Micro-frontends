// src/navBar/root.component.js

import React from 'react'
import {navigateToUrl} from 'single-spa'


class NavBar extends React.Component{

  state={
    email: document.cookie || ''
  }

  render(){
    return(
      this.state.email ?( //user is isgned in
        <nav>
        <div className="nav-wrapper">
          <a href="/" onClick={navigateToUrl} className="brand-logo">single-spa</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/" onClick={navigateToUrl}>Home</a></li>
            <li><a href="/about" onClick={navigateToUrl}>About</a></li>
            <li><a href="/contactus" onClick={navigateToUrl}>Contact us</a></li>
            <li><a href="/contactus" onClick={navigateToUrl}>Logout {this.state.email.split('=').pop()}</a></li>
          </ul>
        </div>
      </nav>
      ):(       //user is not signed in
        <nav>     
        <div className="nav-wrapper">
          <a href="/" onClick={navigateToUrl} className="brand-logo">single-spa</a>
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