import React, { Component } from 'react';
import players from './data/players.json';
import _ from 'lodash';

class Pick extends Component {
  state = {playerToDraft: "", draft: null}

  componentDidMount() {
    fetch(`/api/drafts/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => this.setState({ draft: data.draft }));
  }

  pickIsIn(event) {
    if (event.target.value) {
      this.setState({ playerToDraft: JSON.parse(event.target.value) });
    }
  }

  draftPlayer() {
    if (this.state.playerToDraft) {
      fetch(`/api/drafts/${this.props.match.params.id}/pick`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify(this.state.playerToDraft)
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ playerToDraft: "", draft: data.draft});
      });
    }
  }

  render() {
    if (this.state.draft === null) {
      return null;
    }

    const playersSelected = _.map(this.state.draft.picks, pick => pick.name);

    return (
      <div className="Pick">
        <h1>Pick {this.state.draft.picks.length % 10 + 1} in Round {Math.floor(this.state.draft.picks.length / 10) + 1}</h1>
        <select onChange={this.pickIsIn.bind(this)} value={JSON.stringify(this.state.playerToDraft)}>
            <option value="">Select Player</option>
            {
                players.map((player) => {
                    if (_.indexOf(playersSelected, player.name) < 0) {
                      return <option key={player.name} value={JSON.stringify(player)}>{player.name} - {player.team} - {player.position}</option>
                    } else {
                      return null;
                    }
                })
            }
        </select>
        <button onClick={this.draftPlayer.bind(this)}>Draft Player</button>
        { this.state.playerToDraft &&
          <h1>Picking: {this.state.playerToDraft.name}</h1>
        }
      </div>
    );
  }
}

export default Pick;
