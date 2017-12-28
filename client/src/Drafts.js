import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Drafts extends Component {
  state = {drafts: []}

  componentDidMount() {
    fetch(`/api${this.props.match.url}`)
      .then(res => res.json())
      .then(data => this.setState({ drafts: data.drafts }));
  }

  render() {
    return (
      <div className="Drafts">
        <h1>Drafts</h1>
        {this.state.drafts.map(draft =>
          <Link key={draft._id} to={`${this.props.match.url}/${draft._id}`}>
          {draft.title}
          </Link>
        )}
      </div>
    );
  }
}

export default Drafts;
