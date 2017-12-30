import React, { Component } from 'react';
import _ from 'lodash';
import './timer.css';

class Timer extends Component {
  render() {
    if (this.props.draft === null) {
      return null;
    }

    return (
      <div className="Timer">
        <div>{Math.floor(this.props.draft.timeLeftForCurrentPick / 60)}:{_.padStart(this.props.draft.timeLeftForCurrentPick % 60, 2, '0')}</div>
      </div>
    );
  }
}

export default Timer;
