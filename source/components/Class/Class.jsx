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
		this.submit = this.submit.bind(this);
		this.state = {
			classObject : this.props.location.state.classObje.data[0],
			reviewDivs: [],
			username: '',
			className: '',
      quality: '',
      difficulty: '',
      hours: ''
		};
		this.getReviews = this.getReviews.bind(this);
		this.getReviews(this.state.classObject);
  }

  getReviews(classObj){
    var self = this;
    //console.log(classObj._id);
    axios.get('http://ec2-18-217-116-49.us-east-2.compute.amazonaws.com:3000/api/review?where={"class":' + '"' + classObj._id + '"}')
      .then(function (response) {
        self.addDivs(response.data.data);
    })
    .catch(function (error) {
      //console.log(error);
    });
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
								<td>Hours:</td>
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
		const curClass = ((this.props.location || {}).state || {}).className
    if(curClass) {
      this.setState({
		  className: curClass
      })
    }
    if(localStorage.getItem('username') != null) {
      this.setState({username:localStorage.getItem('username') })
    }
  }

	submit(event) {
    	event.preventDefault();
//		Api call to check if user already submitted a review for this class
    if(this.state.username ==''){
      this.props.history.push({
        pathname: `/login`})
      return
    }
		let theuser = this.state.username;
		//console.log(theuser);
		let theclass = this.state.classObject._id;
		let th = this;
		axios.get('http://localhost:3000/api/review?where={"username":'+'"' + theuser + '"' + ',' + '"class":"' + theclass + '"}') 
		.then(function (response) {
    		//console.log(response);
			if(response.data.data.length == 0){
				//console.log("Submitting the class", th.state.className, th.state.username)
				th.props.history.push({
				pathname: `/review`,
				state: {className: th.state.className, classTitle: th.state.classObject.title, user: th.state.username}
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
				<Header />
				
				<div className="wrapper">

					<div className="titles">
						<h1>{this.state.classObject.major}{this.state.classObject.number}</h1>
						<h3>{this.state.classObject.title}</h3>
						<button onClick={this.submit} type="button">Write Review</button> 
					</div>

					<table className="ratings">
						<tbody>
							<tr>
								<td>Quality: {this.state.quality}</td>
								<td>Difficulty: {this.state.difficulty}</td>
								<td>Hours: {this.state.hours}/week</td>
							</tr>
						</tbody>
					</table>


					<div className="reviews">
						{this.state.reviewDivs}
					</div>

				</div>
      </div>
		)
	}
}

export default Class
