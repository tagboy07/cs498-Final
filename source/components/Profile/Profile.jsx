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
    //     console.log("classmajor");
				// console.log(response.data.data[3].classMajor);
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
								<td>Quality:</td>
								<td>{reviews[i].quality}</td>
							</tr>
							<tr>
								<td>Difficulty:</td>
								<td>{reviews[i].difficulty}</td>
							</tr>
							<tr>
								<td>Hours:</td>
								<td>{reviews[i].hours}</td>
							</tr>
						</tbody>
					</table>
					<p className="comment">{reviews[i].comment}</p>
        </div>
      )
    }
    this.setState({reviewDivs: items});
   }

	edit(){
		console.log("edit classes");
	}
	
	render() {
		return(
			<div className="Profile">
				<div className="wrapper">
					
					<h1>Username: {this.state.username}</h1>
					
					<h1 className="classes">Classes:</h1>{this.state.classes}
					<a className="edit" onClick={this.edit}>Edit</a>
					
					<h1>Reviews:</h1>
					
					
					<div className="reviews">
	 					{this.state.reviewDivs}
	 				</div>
					
				</div>
			</div>
		)
	}
}

export default Profile
