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
          	username: '',
          	className: '',
			classTitle: ''
				 };
	this.handleQualityChange = this.handleQualityChange.bind(this);
	this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
	this.handleHoursChange = this.handleHoursChange.bind(this);
	this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const user = ((this.props.location || {}).state || {}).user
	const theClassTitle = ((this.props.location || {}).state || {}).classTitle
    const curClass = ((this.props.location || {}).state || {}).className
    if(user) {
      this.setState({
        username: user,
        className: curClass,
		classTitle: theClassTitle
      })
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
	sendReview(event) {
    	event.preventDefault();
		this.setState({comment: event.target.value});
    console.log(this.state.className)
    const classNum = Number(this.state.className.match(/\d+/g)[0]);
    const className = this.state.className.replace(/[0-9]/g, '');
    console.log(this.state.username.user, this.state.className,this.state.qualityrating, this.state.difficultyrating, this.state.hoursrating, this.state.comment)
		if(window.confirm('User' + this.state.username.user + 'Submit Review for ' + this.state.className + '?\n Quality: '+ this.state.qualityrating + '\n Difficulty: ' + this.state.difficultyrating + '\n Hours: '+ this.state.hoursrating + '\n Comment: ' + this.state.comment) == true){
			axios.post('http://localhost:3000/api/review/', {
			username: this.state.username.user,
			class: {classNum, className},
			quality: this.state.qualityrating,
			difficulty: this.state.difficultyrating,
			hours: this.state.hoursrating,
			comment: this.state.comment
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
    console.log(this.state.username, this.state.className)
    return (
    	<div>
    	      <Header></Header>
      	<div className="Review">
			<div className="wrapper">
				<div className="titles">
							<h1>{this.state.className}</h1>
							<h3>{this.state.classTitle}</h3>
				</div>
				<div className="Rating">
					<h1 className = "Before">Quality</h1>
					<ReactStars className = "Stars" count={5} value = {this.state.qualityrating} onChange={this.handleQualityChange} size={24} color2={'#ffd700'} />
					<h1 className = "Before">Difficulty</h1>
					<ReactStars className = "Stars" count={5} value = {this.state.difficultyrating} onChange={this.handleDifficultyChange} size={24} color2={'#ffd700'} />
					<h1 className = "Before">Hours</h1>
					<ReactStars className = "Stars" count={5} value = {this.state.hoursrating} onChange={this.handleHoursChange} size={24} color2={'#ffd700'} />
					<form className = "Comment" onSubmit={this.handleSubmit}>
						<label>
							<h3>Comment: </h3>
							<input className = "textbox" type="text" value={this.state.comment} onChange={this.handleChange}/>
						</label>
						<input className = "subbutton" type="submit" value="Submit" onClick={this.sendReview.bind(this)}/>
					</form>
				</div>
			</div>
		</div>
		</div>
    );
  }


}
export default Review;
