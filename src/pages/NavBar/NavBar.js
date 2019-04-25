import React from "react";
import { withRouter } from 'react-router-dom'


const NavBar = withRouter(({ history }) => {

  const linkSystematically = loc => {
    if (loc === '/') {
      history.push("/")
    }
    else {
      history.push("/dashboard")
    }
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <a className="navbar-brand" onClick={() => linkSystematically('/')}>Home</a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={() => linkSystematically('/dashboard')}>Dashboard</a>
          </li>
        </ul>
      </div>
    </nav>
  );
})

export default NavBar;