import React from 'react'
import {Link, Route, Router, Match } from 'react-router'
import App from './pages/App'


/*module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={App}/>
    <Route path="/battle" component={Battle}/>
  </Route>
)*/


module.exports = (
   <Router>
    <div>
      <Route exact path="/" component={App}/>
    </div>
  </Router>
)