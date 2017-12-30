import React, { Component } from 'react';
import './board.css';
import _ from 'lodash';
import Timer from './Timer';

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
        <Timer draft={this.state.draft}/>
        <h2>
          {this.state.draft.title}: Pick {this.state.draft.picks.length % 10 + 1} in Round {Math.floor(this.state.draft.picks.length / 10) + 1}
        </h2>
        <h3>Picks</h3>
        <div className="picks">
          {
            _.map(this.state.draft.teams, team => {
              return (
                <div className="team">
                  <h4>{team}</h4>
                  {
                    _.map(_.filter(this.state.draft.picks, {selected_by: team}), pick => {
                      return (
                        <div key={pick.name}>
                          {pick.name} {pick.position}
                        </div>
                      );
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Board;
