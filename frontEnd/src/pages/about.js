import React from 'react';

import {fetchApi} from '../fetch'

import Calendar from 'rc-calendar';
import 'rc-calendar/dist/rc-calendar.css';

const About = React.createClass({
  componentWillMount() {
    fetchApi('getData',null,'GET',(resp)=>{
      console.log(resp.statusText);
      alert(resp.statusText)
    })
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