import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Header from '../Header/Header.jsx';
import styles from './Class.scss'

class Class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classObject : this.props.location.state.classObje.data[0],
			reviewDivs: [],
			reviewObjs: [],
			username: '',
			className: '',
			quality: '',
			difficulty: '',
			hours: '',
			revToggle: []
		};
		this.getReviews = this.getReviews.bind(this);
		this.submitReview = this.submitReview.bind(this);
		this.deleteReview = this.deleteReview.bind(this);
		this.getReviews(this.state.classObject);
	}

	getReviews(classObj){
		var self = this;
		console.log("here");
		//console.log(classObj._id);
		axios.get('http://ec2-18-217-116-49.us-east-2.compute.amazonaws.com:3000/api/review?where={"class":' + '"' + classObj._id + '"}')
		.then(function (response) {
			const reviews = response.data.data
			var tempQuality = 0;
			var tempDifficulty = 0;
			var tempHours = 0;
			for(var i=0; i < reviews.length; i++) {
				tempQuality += reviews[i].quality;
				tempDifficulty += reviews[i].difficulty;
				tempHours += reviews[i].hours;
			}
			self.setState({quality : parseFloat((tempQuality/reviews.length).toFixed(2))}, () => {
				self.setState({difficulty: parseFloat((tempDifficulty/reviews.length).toFixed(2))}, () => {
					self.setState({hours: parseFloat((tempHours/reviews.length).toFixed(2))}, () => {
						self.setState({reviewObjs: reviews}, () => {
							console.log("got reviews they are", self.state.reviewObjs)
						});
					});
				});
			});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}

	renderReviews(reviews) {
		let items = [];
		var tempQuality = 0;
		var tempDifficulty = 0;
		var tempHours = 0;
		items = []
		for(var i=0; i < reviews.length; i++) {
			tempQuality += reviews[i].quality;
			tempDifficulty += reviews[i].difficulty;
			tempHours += reviews[i].hours;
			items.push(
				<div className="review" key={i}>
					<table className="reviewRatings">
						<tbody>
							<tr>
								<td>Quality:</td>
								<td>{reviews[i].quality}</td>
							</tr>
							<tr>
								<td>Difficulty:</td>
								<td>{reviews[i].difficulty}</td>
							</tr>
							<tr>
								<td>Time:</td>
								<td>{reviews[i].hours}</td>
							</tr>
						</tbody>
					</table>
					<p className="comment">{reviews[i].comment}</p>
				</div>
			);
		}
		return items;
	}

	addDivs(reviews){
		console.log(reviews);
		let items = [];
		var tempQuality = 0;
		var tempDifficulty = 0;
		var tempHours = 0;
		for(var i=0; i < reviews.length; i++){
			tempQuality += reviews[i].quality;
			tempDifficulty += reviews[i].difficulty;
			tempHours += reviews[i].hours;
			items.push(
				<div className="review" key={i}>
					<table className="reviewRatings">
						<tbody>
							<tr>
								<td>Quality:</td>
								<td>{reviews[i].quality}</td>
							</tr>
							<tr>
								<td>Difficulty:</td>
								<td>{reviews[i].difficulty}</td>
							</tr>
							<tr>
								<td>Time:</td>
								<td>{reviews[i].hours}</td>
							</tr>
						</tbody>
					</table>
					<p className="comment">{reviews[i].comment}</p>
				</div>
			)
		}
		this.setState({quality : tempQuality/reviews.length});
		this.setState({difficulty: tempDifficulty/reviews.length});
		this.setState({hours: tempHours/reviews.length});
		this.setState({reviewDivs: items});
	}

	componentWillMount() {
		console.log("will be mounting");
		const curClass = ((this.props.location || {}).state || {}).className
		if(curClass) {
			this.setState({
				className: curClass
			})
		}
		if(localStorage.getItem('username') != null) {
			this.setState({username:localStorage.getItem('username')}, () => {
				let th = this;
				axios.get('http://ec2-18-217-116-49.us-east-2.compute.amazonaws.com:3000/api/review?where={"username":'+'"' + this.state.username + '"' + ',' + '"class":"' + this.state.classObject._id + '"}')
				.then(function (response) {
					const resObj = response.data.data;
					th.setState({
						revToggle: resObj
					}, () => {
						console.log("mounting revtoggle", th.state.revToggle)
					});
				});
			});
		}
	}


	submitReview() {
		event.preventDefault();
		if(this.state.username ==''){
			this.props.history.push({
				pathname: `/login`
			});
			return
		}
		this.props.history.push({
			pathname: `/review`,
			state: {className: this.state.className, classTitle: this.state.classObject.title, user: this.state.username}
		});
	}

	deleteReview() {
		event.preventDefault();
		if(this.state.username ==''){
			this.props.history.push({
				pathname: `/login`
			});
			return
		}
		const revId = this.state.revToggle[0]._id;
		const queryStr = 'http://ec2-18-217-116-49.us-east-2.compute.amazonaws.com:3000/api/review/' + revId
		let th = this
		axios.delete(queryStr)
		.then(() => {
			th.setState({
				revToggle: []
			}, () => {
				const newRevArray = th.state.reviewObjs.filter(item => {
					if(item._id == revId) {
						return false;
					}
				});
				th.setState({
					reviewObjs: newRevArray
				})
			})
		})
	}

	renderButton() {
		console.log("TOGGLING", this.state.revToggle)
		if(this.state.revToggle.length == 0) {
			return (
				<button onClick={this.submitReview} type="button">Write Review</button>
			)
		}
		else {
			return (
				<button onClick={this.deleteReview} type="button">Delete Review</button>
			)
		}
	}

	render() {
		console.log(this.state.reviewObjs)
		return(
      <div className="Class">
				<Header />
				
				<div className="wrapper">

					<div className="titles">
							<h1>{this.state.classObject.major}{this.state.classObject.number}</h1>
							<h3>{this.state.classObject.title}</h3>
							{this.renderButton()}
						</div>

						<table className="ratings">
							<tbody>
								<tr>
									<td>Quality: {this.state.quality}</td>
									<td>Difficulty: {this.state.difficulty}</td>
									<td>Time: {this.state.hours}</td>
								</tr>
							</tbody>
						</table>
						<div className="reviews">
							{this.renderReviews(this.state.reviewObjs)}
						</div>

				</div>
			</div>
		)
	}
}

export default Class
