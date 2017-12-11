import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

import styles from './Class.scss'

class Class extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  	classObject : this.props.location.state.classObje.data[0],
		  	reviewDivs: []
		};
		this.getReviews = this.getReviews.bind(this);
		this.getReviews(this.state.classObject);
  }

  getReviews(classObj){
    var self = this;
    console.log(classObj._id);
    axios.get('http://localhost:3000/api/review?where={"class":' + '"' + classObj._id + '"}')
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
          <p> {reviews[i].comment} </p>
          <p> {reviews[i].quality} </p>
          <p> {reviews[i].difficulty} </p>
          <p> {reviews[i].hours} </p>
        </div>
      )
    }
    this.setState({reviewDivs: items});
   }
	
	render() {
		return(
			<div className="Class">
				<h2>{this.state.classObject.title}</h2>
				<h3>Quality: {this.state.classObject.quality}</h3>
				<h3>Difficulty: {this.state.classObject.difficulty}</h3>
				<h3>Hours: {this.state.classObject.hours}</h3>
				<Link to="/review">
					<button type="button">
          				Wrte Review
     				</button>
 				</Link>
 				 <div className="reviewss">
 					{this.state.reviewDivs}
 				</div>
			</div>
		)
	}
}

export default Class