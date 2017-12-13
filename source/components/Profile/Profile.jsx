import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import styles from './Profile.scss'

var baseURL = 'http://localhost:3000';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			username : localStorage.getItem('username'),
			classDivs : [],
			classes : [],
			reviewDive: [],
			reviews : []
		}

		this.getReviews = this.getReviews.bind(this);
		this.getReviews(this.state.username);
		this.getClasses = this.getClasses.bind(this);
		this.getClasses();
	}


getReviews(user){
    var self = this;
    axios.get(baseURL + '/api/review?where={"username":' + '"' + this.state.username + '"}')
      .then(function (response) {
        console.log("classmajor");
				console.log(response.data.data[3].classMajor);
			self.setState({ reviews : response.data.data});
        self.addDivs(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getClasses(){
  	console.log("here");
  	var self = this;
  	axios.get(baseURL + '/api/student/' + this.state.username + '/classes')
  	.then(function (response) {
        // console.log(response);
						self.setState({ classes : response.data.data});
            // console.log(response.data.data);
        self.addClassesDivs(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addClassesDivs(classes){
  	let items = [];
		// console.log(classes);
    for(var i=0; i < classes.length; i++){
      items.push(
        <div className="rev" key={i}>
          <p> classs: {classes[i].title} </p>
        </div>
      )
    }
    this.setState({classDivs: items});
  }


  addDivs(reviews){
    let items = [];
    for(var i=0; i < reviews.length; i++){
    	console.log(reviews[i].quality);
      items.push(
				<div className="review" key={i}>
					<table className="reviewRatings">
						<tbody>
							<tr>
								<td>Quality: {reviews[i].quality}</td>
								<td>Difficulty: {reviews[i].difficulty}</td>
								<td>Hours: {reviews[i].hours}</td>
							</tr>
						</tbody>
					</table>
          <p> comment: {reviews[i].comment}</p>
        </div>
      )
    }
    this.setState({reviewDivs: items});
   }

	render() {
		return(
			<div className="Class">
				<div className="wrapper">
					<div className="reviews">
	 					{this.state.reviewDivs}
	 				</div>
				</div>
 				<div className="classes">
 					{this.state.classDivs}
 				</div>
			</div>
		)
	}
}

export default Profile
