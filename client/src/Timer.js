import React, { Component } from 'react';
import _ from 'lodash';

class Timer extends Component {
  render() {
    if (this.props.draft === null) {
      return null;
    }

    return (
      <div className="Timer">
        <h1>Timer for {this.props.draft.title}</h1>
        <div>{this.props.draft.timeLeftForCurrentPick}</div>
      </div>
    );
  }
}

export default Timer;
