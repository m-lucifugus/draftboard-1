import React, { Component } from 'react';

class Board extends Component {
  state = {draft: {}}

  componentDidMount() {
    fetch(`/api/drafts/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => this.setState({ draft: data.draft }));
  }

  render() {
    return (
      <div className="Board">
        <h1>Board</h1>
        <div>
          {this.state.draft.title}
        </div>
        <h2>Picks</h2>
        <ul>
          {
            this.state.draft.picks && this.state.draft.picks.map(pick =>
              <li>{pick.name} selected by {pick.selected_by}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Board;
