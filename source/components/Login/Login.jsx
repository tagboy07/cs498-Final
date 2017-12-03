import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import styles from './Login.scss'


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  checkboxstate: true
		};
  	}
    render() {
        return(
            <div className="Home">
                <h1>Sanity Check</h1>
					<div id = "loginbox">
						<div class="ui input">
  							<input type="text" placeholder="Username" />
							<input type="text" placeholder="Password" />
						</div>
						<div class="ui checkbox">
  							<input type="checkbox" />
  							<label>Remember Me</label>
						</div>
						<Button>
    						Login
						</Button>
					</div>
            </div>
        )
    }
}

export default Login
