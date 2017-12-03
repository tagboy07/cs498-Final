import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Home.scss'


class Home extends Component {
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
					</div>
            </div>
        )
    }
}

export default Home
