import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DraftInfo extends Component {
  state = {draft: {}}

  componentDidMount() {
    fetch(`/api${this.props.match.url}`)
      .then(res => res.json())
      .then(data => this.setState({ draft: data.draft }));
  }

  render() {
    return (
      <div className="DraftInfo">
        <h1>Draft Info</h1>
        <div>
          {this.state.draft.title}
        </div>
        <ul>
          <li>
            <Link to={`${this.props.match.url}/pick`}>
            Player Select
            </Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/board`}>
            Board
            </Link>
          </li>
        </ul>
        <h2>Teams</h2>
        <ul>
          {
            this.state.draft.teams && this.state.draft.teams.map(team =>
              <li key={team}>{team}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default DraftInfo;
