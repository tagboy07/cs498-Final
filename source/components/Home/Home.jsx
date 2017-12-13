import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Input } from 'semantic-ui-react'
import Header from '../Header/Header.jsx';
import styles from './Home.scss'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        value: '',
        username:  '',
        divItems : []

    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);    
  }

  componentWillMount() {
    if(localStorage.getItem('username') != null) {
      this.setState({username:localStorage.getItem('username') })
    }
  }

    handleChange(event){
        this.setState({value: event.target.value.toUpperCase() });
    }

	submit(event){
    event.preventDefault();
    const prefixAndPostfix = this.state.value.split(/(\d+)/);
    var self = this;
    axios.get('http://ec2-18-217-116-49.us-east-2.compute.amazonaws.com:3000/api/class?where={"number":' + prefixAndPostfix[1] + ',' + '"major" :"' + prefixAndPostfix[0] + '"}')
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
      state: { classObje : classObj, className: this.state.value}
    });
  }

  render() {
    console.log("here")
    return (
      <div className="fullBody">
            <Header fake={"Test"}/>
      <div className="Home">
        <div className="transparentBlue"></div>
        <h1>SANITY CHECK</h1>
        <h3>The best place to review UIUC classes and see how hard next semester will be.</h3>
        <form onSubmit={this.submit}>
            <input  type="text"
                    placeholder="Search for a class..."
                    value={this.state.value} 
                    onChange={this.handleChange}
            />
        </form>
      </div>
    </div>
    );
  }

}
export default Home;
