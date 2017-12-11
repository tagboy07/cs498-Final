import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Divider, Grid, Header, Input } from 'semantic-ui-react'

import styles from './Home.scss'

class Home extends Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
        value: '',
        username: props.username || '',
        divItems : []
    };
    console.log('username:', this.state.username);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

    handleChange(event){
        this.setState({value: event.target.value.toUpperCase() });
    }

	submit(event){
    event.preventDefault();
    const prefixAndPostfix = this.state.value.split(/(\d+)/);
    var self = this;
    axios.get('http://localhost:3000/api/class?where={"number":' + prefixAndPostfix[1] + ',' + '"major" :"' + prefixAndPostfix[0] + '"}')
      .then(function (response) {
        self.goToClass(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
	}

  goToClass(classObj){
    this.props.history.push({
      pathname: `/class/${this.state.value}`,
      state: { classObje : classObj}
    });
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