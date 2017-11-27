import React from 'react';

import * as fetchApi from '../fetch'

import Calendar from 'rc-calendar';
import 'rc-calendar/dist/rc-calendar.css';

const About = React.createClass({
  componentWillMount() {
    fetchApi.fetchData('getData')
    // .then((json) => {
    //    console.log(json)
    // });
},
  render() {
    return <div>
      <h3>About</h3>
      <Calendar/>
    </div>
  }
})

module.exports = About;