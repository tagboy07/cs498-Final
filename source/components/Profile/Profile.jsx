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
			username : '',
			classDivs : [],
			reviewDivs: []
		}
		this.getReviews = this.getReviews.bind(this);
		this.getReviews(this.state.username);
		this.getClasses = this.getClasses.bind(this);
		this.getClasses();
	}

  componentWillMount() {
    if(localStorage.getItem('username') != null) {
      this.setState({username:localStorage.getItem('username') })
    }
  }

getReviews(user){
    var self = this;
    axios.get(baseURL + '/api/review?where={"username":' + '"' + this.state.username + '"}')
      .then(function (response) {
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
        console.log(response);
        self.addClassesDivs(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addClassesDivs(classes){
  	let items = [];
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
        <div className="rev" key={i}>
          <p> comment: {reviews[i].comment} </p>
        </div>
      )
    }
    this.setState({reviewDivs: items});
   }

	render() {
		return(
			<div className="Profile">
				<div className="reviewss">
 					{this.state.reviewDivs}
 				</div>
 				<div className="classes">
 					{this.state.classDivs}
 				</div>
			</div>
		)
	}
}

export default Profile