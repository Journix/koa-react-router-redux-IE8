import React from 'react';

import Calendar from 'rc-calendar';
import 'rc-calendar/dist/rc-calendar.css';

const About = React.createClass({
  render() {
    return <div>
      <h3>About</h3>
      <Calendar/>
    </div>
  }
})

module.exports = About;