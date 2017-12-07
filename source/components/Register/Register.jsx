import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

class Register extends Component {
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

      axios.post('http://localhost:3000/api/login/', {
        netId: this.state.netId, 
        lastName: this.state.password
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
			          <input type='text' value={this.state.netId}  onChange={this.handleNetIdChange} placeholder='NetId' />
			          <input type='password' value={this.state.password}  onChange={this.handlePasswordChange} placeholder='Password' />
			        </div>
			        <button type='submit' onClick={this.login.bind(this)}>Submit</button>
			      </form>
            </div>
        )
    }
}

export default Register
