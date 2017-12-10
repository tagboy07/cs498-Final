import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import styles from './Class.scss'

class Class extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  	className : this.props.location.state.className
		};
		console.log(this.state.className);
  }

  
	
	render() {
		return(
			<div className="Class">
				<h2>CS 225</h2>
				<h3>Quality</h3>
				<h3>Difficulty</h3>
				<h3>Hours</h3>
				<Link to="/review">
					<button type="button">
          				Wrte Review
     				</button>
 				</Link>
			</div>
		)
	}
}

export default Class