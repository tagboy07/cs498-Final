import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Class.scss'

class Class extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.state = {
			classObject : this.props.location.state.classObje.data[0],
			reviewDivs: [],
			username: '',
			className: ''
		};
		this.getReviews = this.getReviews.bind(this);
		this.getReviews(this.state.classObject);
  }


  getReviews(classObj){
    var self = this;
    console.log(classObj._id);
    axios.get('http://ec2-18-217-116-49.us-east-2.compute.amazonaws.com:3000/api/review?where={"class":' + '"' + classObj._id + '"}')
      .then(function (response) {
        self.addDivs(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addDivs(reviews){
    console.log(reviews);
    let items = [];
    for(var i=0; i < reviews.length; i++){
    	console.log(reviews[i].quality);
      items.push(
        <div className="review" key={i}>
					<table className="reviewRatings">
						<tr>
							<td>Quality: {reviews[i].quality}</td>
							<td>Difficulty: {reviews[i].difficulty}</td>
							<td>Hours: {reviews[i].hours}</td>
						</tr>
					</table>
          <p> comment: {reviews[i].comment}</p>
        </div>
      )
    }
    this.setState({reviewDivs: items});
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
//		Api call to check if user already submitted a review for this class
		let theuser = this.state.username.user;
		console.log(theuser);
		let theclass = this.state.classObject._id;
		let th = this;
		axios.get('http://localhost:3000/api/review?where={"username":'+'"' + theuser + '"' + ',' + '"class":"' + theclass + '"}') 
		.then(function (response) {
    		console.log(response);
			if(response.data.data.length == 0){
				console.log("Submitting the class", th.state.className, th.state.username)
				th.props.history.push({
				pathname: `/review`,
				state: {className: th.state.className, user: th.state.username}
					});
			}
			else{
				alert("You already submitted a review for this class.");
			}
		})
		.catch(function (error) {
    		console.log(error);
  		});
	}
	
	render() {
		return(
			<div className="Class">
				<div className="wrapper">

					<div className="titles">
						<h1>{this.state.classObject.major}{this.state.classObject.number}</h1>
						<h3>{this.state.classObject.title}</h3>
					</div>

					<table className="ratings">
						<tr>
							<td>Quality: {this.state.classObject.quality}</td>
							<td>Difficulty: {this.state.classObject.difficulty}</td>
							<td>Hours: {this.state.classObject.hours}</td>
						</tr>
					</table>

						<button onClick={this.submit} type="button">
								Write Review
					</button> 
					
					<div className="reviews">
						{this.state.reviewDivs}
					</div>
					
				</div>
			</div>
		)
	}
}

export default Class
