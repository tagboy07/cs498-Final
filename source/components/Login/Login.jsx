import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Login.scss'
import Auth from './Auth.js'
import axios from 'axios'
import Header from '../Header/Header.jsx';
class Login extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: '',
			password: '',
			error: ''
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
			th.props.history.push({
				pathname: '/',
			});
			localStorage.setItem('username', response.data.user)
		})
		.catch(function (error) {
			console.log(error);
			th.setState({error: "The username or password is incorrect."});
		});

	}
	render() {
		return(
			 <div>     
			 	<Header></Header>
				<div className="Login">
					<form role='form'>
						<h1>SANITY CHECK</h1>

						<input className="username" type='text' value={this.state.username}  onChange={this.handleUsernameChange} placeholder='Username' />
						<span className="underline"></span>

						<input type='password' value={this.state.password}  onChange={this.handlePasswordChange} placeholder='Password' />
						<span className="underline"></span>

						<Link to={"/register"}>Register</Link>
						<button type='submit' onClick={this.login.bind(this)}>LOGIN</button>

						<p className="error">{this.state.error}</p>
					</form>
				</div>
			</div>
		)
	}
}

export default Login
