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
    	username: ''
    };
  }
  componentWillReceiveProps(newProps){
    console.log(newProps)
  	this.setState({username: newProps.theUsername })

  }

  render() {
    return (
      <div className="Header">				
				<div className="trap">
					<div className="links">
						<ul>
							<Link to={"/"}>Home</Link>
							<span className="divider">|</span>
							<Link to={"/login"}>Profile</Link>
							<span className="divider">|</span>
							<Link to={"/login"}>Login</Link>
						</ul>
					</div>
				</div>
			</div>
    );
  }

}


export default Header