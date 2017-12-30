import React, { Component } from 'react';
import './pickpopup.css';

class PickPopUp extends Component {
  render() {
    return (
      <div className="PickPopUp">
        <div className="body">
          {this.props.pick.name}
        </div>
      </div>
    );
  }
}

export default PickPopUp;
