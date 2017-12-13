import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Container, Divider, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here

import App from './components/App/App.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

render(

        <App />, document.getElementById('app')
);