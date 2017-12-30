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
        <div>{Math.floor(this.props.draft.timeLeftForCurrentPick / 60)}:{_.padStart(this.props.draft.timeLeftForCurrentPick % 60, 2, '0')}</div>
      </div>
    );
  }
}

export default Timer;
