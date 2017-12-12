import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Class.scss'

class Class extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this)
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
        <div className="rev" key={i}>
          <p> comment: {reviews[i].comment} quality: {reviews[i].quality} difficulty: {reviews[i].difficulty} hours: {reviews[i].hours}</p>
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
		console.log("Submitting the class", this.state.className, this.state.username)
		this.props.history.push({
        pathname: `/review`,
        state: {className: this.state.className, user: this.state.username}
    });
	}
	
	render() {
		return(
			<div className="Class">
				<h2>{this.state.classObject.title}</h2>
				<h3>Quality: {this.state.classObject.quality}</h3>
				<h3>Difficulty: {this.state.classObject.difficulty}</h3>
				<h3>Hours: {this.state.classObject.hours}</h3>
				<button onClick={this.submit} type="button">
          			Write Review
     			</button>
 				 <div className="reviewss">
 					{this.state.reviewDivs}
 				</div>
			</div>
		)
	}
}

export default Class
