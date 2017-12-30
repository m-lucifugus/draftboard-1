import React, { Component } from 'react';
import './board.css';
import _ from 'lodash';
import Timer from './Timer';
import Pusher from 'pusher-js';

const socket = new Pusher('ee10fbce41148d3ef784', {
  cluster: 'mt1'
});
const channel = socket.subscribe('draft');

class Board extends Component {
  state = {draft: null}

  componentDidMount() {
    fetch(`/api/drafts/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => this.setState({ draft: data.draft }));

    channel.bind('update', (data) =>
      this.setState({ draft: data.draft })
    );
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
        <div className="draft-board">
          {
            _.map(this.state.draft.teams, team => {
              return (
                <div className="team" key={team}>
                  <h4>{team}</h4>
                  {
                    _.map(_.filter(this.state.draft.picks, {selected_by: team}), pick => {
                      let nameSplit = _.split(pick.name, ' ');
                      let lastName = _.last(nameSplit);
                      let firstName = _.dropRight(nameSplit);

                      return (
                        <div key={pick.name} className={`pick ${pick.position}`}>
                          <div className='position'>{pick.position}</div>
                          <div className='first-name'>{firstName}</div>
                          <div className='last-name'>{lastName}</div>
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
