import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Divider, Grid, Input } from 'semantic-ui-react'

import styles from './Header.scss'

class Header extends Component {

  constructor(props) {
    super();
    this.state = {
      dummyString:''
    };
  }
  componentWillReceiveProps(newProps){
    this.setState({
      dummyString: 'lol'
    })
  }

  deleteStorage(){
    var data = localStorage.getItem('username')
    if(data != null) {
       localStorage.removeItem('username');
    }
  }

  logOutOrLogin(){
    var data = localStorage.getItem('username');
    if(data != null){
      return <Link to={"/login"}>Logout</Link>
    }
    return <Link to={"/login"}>Login</Link> 
  }
  profileOrLogin(){
    var data = localStorage.getItem('username');
    if(data != null){
      return <Link to={`/profile/${data}`}>Profile</Link>
    }
    return <Link to={"/login"}>Profile</Link>
  }

  render() {
    var data = localStorage.getItem('username');
    if(data != null){
      return (
        <div className="Header">				
  				<div className="trap">
  					<div className="links">
  						<ul>
  							<Link to={"/"}>Home</Link>
  							<span className="divider">|</span>
  							<Link to={`/profile/${data}`}>Profile</Link>
  							<span className="divider">|</span>
  							<span className="logout" onClick= { () => {this.deleteStorage()}}> <Link to={"/login"}>Logout</Link></span>
  						</ul>
  					</div>
  				</div>
  			</div>
      );
    }else{
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

}


export default Header