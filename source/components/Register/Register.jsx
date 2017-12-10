import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
		      username: '',
		      password: '',
          repeatPassword: ''
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

      axios.post('http://localhost:3000/api/account/register', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function (response) {
        console.log(response);
        //TODO: Handle Right Password
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
                <input type='password' value={this.state.repeatPassword}  onChange={this.handleRepeatPasswordChange} placeholder='Repeat Password' />
			        </div>
			        <button type='submit' onClick={this.login.bind(this)}>Create Account!</button>
			      </form>
            </div>
        )
    }
}

export default Register
