import React, { Component } from 'react';

class Board extends Component {
  state = {draft: null}

  componentDidMount() {
    fetch(`/api/drafts/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => this.setState({ draft: data.draft }));
  }

  render() {
    if (this.state.draft === null) {
      return null;
    }

    return (
      <div className="Board">
        <h1>Board</h1>
        <h2>
          {this.state.draft.title}: Pick {this.state.draft.picks.length % 10 + 1} in Round {Math.floor(this.state.draft.picks.length / 10) + 1}
        </h2>
        <h3>Picks</h3>
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
