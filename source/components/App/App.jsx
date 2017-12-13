import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Container, Divider, Grid, Image } from 'semantic-ui-react'


import Home from '../Home/Home.jsx';
import Class from '../Class/Class.jsx';
import Login from '../Login/Login.jsx';
import Header from '../Header/Header.jsx';
import Register from '../Register/Register.jsx';
import Review from '../Review/Review.jsx';
import Profile from '../Profile/Profile.jsx';


class App extends Component {


	render(){
		return( 
				<Router>
			      <div className="wrapper">
			        <Route exact path="/" component={Home}/>
			        <Route path="/login/" component={Login} />
			        <Route path="/register" component={Register} />
			        <Route path="/header" component={Header} />
			        <Route path="/class/:id" component={Class} />
			        <Route path="/review/" component={Review} />
			        <Route path="/profile/:id" component={Profile} />
			      </div>
			    </Router>
	    	)
	}

}

export default App;