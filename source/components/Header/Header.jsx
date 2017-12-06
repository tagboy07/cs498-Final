import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Divider, Grid, Input } from 'semantic-ui-react'

import styles from './Header.scss'

class Header extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="Header">
				<Link to={"/"}><h1>Sanity Check</h1></Link>
				
				<div className="trap">
					<div className="links">
						<Link to={"/login"}>Login</Link>
					</div>
				</div>
			</div>
    );
  }

}


export default Header