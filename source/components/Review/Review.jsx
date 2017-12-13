import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Divider, Grid, Input } from 'semantic-ui-react'
import ReactStars from 'react-stars'
import Header from '../Header/Header.jsx';
import styles from './Review.scss'

//const ratingChanged = (newRating) => {
//	console.log(newRating);
//	this.setState({difficultyrating: newRating});
//}

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {
			comment: '',
		  	qualityrating: 0,
		  	difficultyrating: 0,
		  	hoursrating: 0,
          	className: '',
			classTitle: '',
			username: ''
				 };
	this.handleQualityChange = this.handleQualityChange.bind(this);
	this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
	this.handleHoursChange = this.handleHoursChange.bind(this);
	this.handleChange = this.handleChange.bind(this);
  this.sendReview = this.sendReview.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

	const theClassTitle = ((this.props.location || {}).state || {}).classTitle
    const curClass = ((this.props.location || {}).state || {}).className
    if(curClass) {
      this.setState({
        className: curClass,
		classTitle: theClassTitle
      })
    }
    if(localStorage.getItem('username') != null) {
      this.setState({username:localStorage.getItem('username') })
    }
  }

	handleQualityChange(e){
		this.setState({qualityrating: e})
	}
	handleDifficultyChange(e){
		this.setState({difficultyrating: e})
	}
	handleHoursChange(e){
		this.setState({hoursrating: e})
	}
	handleChange(e){
		this.setState({comment: e.target.value});
	}
  handleSubmit(e) {
    e.preventDefault();
  }
	sendReview(event) {
    	event.preventDefault();
		this.setState({comment: event.target.value});
    console.log(this.state.className)
    const classNum = Number(this.state.className.match(/\d+/g)[0].trim());
    const className = this.state.className.replace(/[0-9]/g, '').trim();
    console.log(this.state.username, this.state.className,this.state.qualityrating, this.state.difficultyrating, this.state.hoursrating, this.state.comment)
		if(1){
			axios.post('http://ec2-18-217-116-49.us-east-2.compute.amazonaws.com:3000/api/review/', {
			username: this.state.username,
			class: {classNum, className},
			quality: this.state.qualityrating || 0,
			difficulty: this.state.difficultyrating || 0,
			hours: this.state.hoursrating || 0,
			comment: this.state.comment || ''
		  })
		  .then(function (response) {
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		window.history.back();
		}

  	}

  render() {
		return (
			<div className="Review">
				<Header />

				<div className="wrapper">
					<div className="titles">
						<h1>{this.state.className}</h1>
						<h3>{this.state.classTitle}</h3>
					</div>

					<div className="rating">
						<h1>Quality</h1>
						<ReactStars className = "stars" count={5} value = {this.state.qualityrating} onChange={this.handleQualityChange} size={24} color1={'#ffffff'} color2={'#1ECD97'} />

						<h1>Difficulty</h1>
						<ReactStars className = "stars" count={5} value = {this.state.difficultyrating} onChange={this.handleDifficultyChange} size={24} color1={'#ffffff'} color2={'#1ECD97'} />

						<h1>Hours</h1>
						<ReactStars className = "stars" count={5} value = {this.state.hoursrating} onChange={this.handleHoursChange} size={24} color1={'#ffffff'} color2={'#1ECD97'} />

						<h1>Comment</h1>
						<form className="Comment" onSubmit={this.handleSubmit}>
								<textarea value={this.state.comment} onChange={this.handleChange}></textarea>
						</form>

						<button onClick={this.sendReview} type="button">Submit Review</button>
					</div>
				</div>
			</div>
		);
  }


}
export default Review;
