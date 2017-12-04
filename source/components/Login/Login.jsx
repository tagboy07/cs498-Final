import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Login.scss'
import Auth from './Auth.js'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
		      netId: '',
		      password: ''
		};
		this.handleNetIdChange = this.handleNetIdChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
  	}

  	handleNetIdChange(event) {
    	this.setState({netId: event.target.value});
    }

    handlePasswordChange(event) {
    	this.setState({password: event.target.value});
    }


    login(event) {
    	event.preventDefault();
    //Authenticate NetId/Password
	 Auth.login(this.state.netId, this.state.password);

  	}
    render() {
        return(
            <div className="Login">
                <h1>Sanity Check</h1>
                   <form role='form'>
			        <div className='form-group'>
			          <input type='text' value={this.state.netId}  onChange={this.handleNetIdChange} placeholder='NetId' />
			          <input type='password' value={this.state.password}  onChange={this.handlePasswordChange} placeholder='Password' />
			        </div>
			        <button type='submit' onClick={this.login.bind(this)}>Submit</button>
			      </form>
            </div>
        )
    }
}

export default Login
