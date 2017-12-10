import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Login.scss'
import Auth from './Auth.js'
import axios from 'axios'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
		      username: '',
		      password: ''
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
  	}

  	handleUsernameChange(event) {
    	this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
    	this.setState({password: event.target.value});
    }


    login(event) {
    	event.preventDefault();
        
        let th = this;

      axios.post('http://localhost:3000/api/account/login', {
        username: this.state.username, 
        password: this.state.password
      })
      .then(function (response) {
        console.log(response);
        //TODO: Handle Right Password
        th.props.history.goBack();
      })
      .catch(function (error) {
        console.log(error);
        //TODO: Handle Wrong Password
      });

  	}
    render() {
        return(
            <div className="Login">
            <form role='form'>
			        <div className='form-group'>
			          <input type='text' value={this.state.username}  onChange={this.handleUsernameChange} placeholder='Username' />
			          <input type='password' value={this.state.password}  onChange={this.handlePasswordChange} placeholder='Password' />
			        </div>
			        <button type='submit' onClick={this.login.bind(this)}>Submit</button>
			      </form>
            <div>
                <Link to={"/register"}>Register</Link>
            </div>
            </div>
        )
    }
}

export default Login
