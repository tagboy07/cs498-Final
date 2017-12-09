import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Divider, Grid, Header, Input } from 'semantic-ui-react'
import ReactStars from 'react-stars'

import styles from './Review.scss'

const ratingChanged = (newRating) => {
  console.log(newRating)
}

class Review extends Component {

  constructor() {
    super();
    this.state = {value: ''};

  }
	handleChange(event) {
    	this.setState({value: event.target.value});
  }
	handleSubmit(event) {
		alert('Review Submitted');
		event.preventDefault();
  }
  render() {
    return (
      	<div className="Review">
			<div className="rating">
				<h1>Quality</h1>
				<ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} />
				<h1>Difficulty</h1>
				<ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} />
				<h1>Hours</h1>
				<ReactStars count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} />
			</div>	
				<form onSubmit={this.handleSubmit}>
					<label>
					  Comment:
					  <input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
		</div>
    );
  }

}


export default Review