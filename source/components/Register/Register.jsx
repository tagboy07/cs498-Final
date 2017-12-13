import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Header from '../Header/Header.jsx';
class Register extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: '',
			password: '',
			repeatPassword: '',
			error: ''
		};
		
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
  }

	handleRepeatPasswordChange(event) {
		this.setState({repeatPassword: event.target.value});
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
		
		if(this.state.password != this.state.repeatPassword){
			this.setState({error: "The passwords do not match."});
			return;
		}
		
		axios.post('http://localhost:3000/api/account/register', {
			username: this.state.username,
			password: this.state.password
		})
		.then(function (response) {
			localStorage.setItem('username', response.data.user)
			th.props.history.push({
				pathname: '/',
			})
		})
		.catch(function (error) {
			console.log(error);
			th.setState({error: "That username is already taken."});
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

						<input type='password' value={this.state.repeatPassword}  onChange={this.handleRepeatPasswordChange} placeholder='Confirm Password' />
						<span className="underline"></span>

						<Link to="/login">Login</Link>
						<button type='submit' onClick={this.login.bind(this)}>REGISTER</button>
						
						<p className="error">{this.state.error}</p>
					</form>
				</div>
			</div>
		)
	}
}

export default Register
