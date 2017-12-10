import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Divider, Grid, Header, Input } from 'semantic-ui-react'

import styles from './Home.scss'

class Home extends Component {

  constructor() {
    super();
    this.state = {
			value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value.toUpperCase() });
  }
	
	submit(event){
		this.props.history.push(`/class/${this.state.value}`);
	}

  render() {
    return (
      <div className="Home">
				<section className="searchSection">
					<div className="transparentBlue"></div>
					<h1>REVIEW A CLASS NOW</h1>
					<h3>The best place to rate UIUC classes and see how hard next semester will be.</h3>
					<form onSubmit={this.submit}>
						<input  type="text"
										placeholder="Search for a class..."
										value={this.state.value} 
										onChange={this.handleChange}
						/>
					</form>
				</section>
      </div>
    );
  }

}


export default Home