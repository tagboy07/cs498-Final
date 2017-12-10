import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import styles from './Class.scss'

class Class extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this)
		this.state = {
			username: '',
			className: ''
		};
  }

	componentWillMount() {
    const user = ((this.props.location || {}).state || {}).user
		const curClass = ((this.props.location || {}).state || {}).className
		console.log(user, curClass)
    if(user) {
      this.setState({
        username: user,
				className: curClass
      })
    }
  }

	submit(event) {
    event.preventDefault();
		console.log("Submitting the class", this.state.className, this.state.username)
		this.props.history.push({
        pathname: `/review`,
        state: {className: this.state.className, user: this.state.username}
    });
	}

	render() {
		return(
			<div className="Class">
				<h2>CS 225</h2>
				<h3>Quality</h3>
				<h3>Difficulty</h3>
				<h3>Hours</h3>
				<button onClick={this.submit} type="button">
          	Write Review
     		</button>
			</div>
		)
	}
}

export default Class
