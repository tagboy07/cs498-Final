import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Container, Divider, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Home from './components/Home/Home.jsx';
import Class from './components/Class/Class.jsx';
import Login from './components/Login/Login.jsx';
import Header from './components/Header/Header.jsx';


// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

render(
    <Router>
      <div>
				<Header></Header>

        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/header" component={Header} />
          <Route path="/class/:id" component={Class} />
        </div>
      </div>
    </Router>,
    document.getElementById('app')
);