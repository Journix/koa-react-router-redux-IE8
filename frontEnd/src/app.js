// import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute} from 'react-router';

import store from './stores'

// let Calendar = require('rc-calendar');

// import Calendar from 'rc-calendar';
// import 'rc-calendar/dist/rc-calendar.css';

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

// const About = React.createClass({
//   render() {
//     return <div>
//       <h3>About</h3>
//       <Calendar/>
//     </div>
//   }
// })
const About = React.createClass({
  render() {
    return <div>
      <h3>About</h3>
    </div>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
