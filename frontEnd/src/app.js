// import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, withRouter} from 'react-router';

import store from './stores'

import About from './pages/about'

import ErrorPage from './pages/errorPage'


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
    <Route path="*" component={withRouter(ErrorPage)}/>
  </Router>
), document.getElementById('app'))
