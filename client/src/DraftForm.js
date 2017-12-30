import React, { Component } from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

class DraftForm extends Component {
  state = {draft: {title: "", teams: ["","","","","","","","","",""]}}

  save() {
    console.log("SAVING", this.state.draft);
    fetch(`/api/drafts`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(this.state.draft)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({draft: data.draft});
    });
  }

  titleChanged(event) {
    let currentDraft = this.state.draft;
    currentDraft.title = event.target.value;
    this.setState({draft: currentDraft});
  }

  teamChanged(event) {
    let currentDraft = this.state.draft;
    currentDraft.teams[event.target.dataset.index] = event.target.value;
    this.setState({draft: currentDraft});
  }

  render() {
    if (this.state.draft._id) {
      return <Redirect to={`/drafts/${this.state.draft._id}`}/>;
    }

    return (
      <div className="DraftForm">
        <h1>New Draft</h1>
        <div>
          <input type="text" name="title" placeholder="Draft Title" value={this.state.draft.title} onChange={this.titleChanged.bind(this)} />
        </div>
        <ul>
          {
            _.map([0,1,2,3,4,5,6,7,8,9], index =>
              <li key={index}>
                <input type="text" name="teams[]" data-index={index} placeholder={`Team ${index + 1}`} value={this.state.draft.teams[index]} onChange={this.teamChanged.bind(this)} />
              </li>
            )
          }
        </ul>
        <div>
          <button type="submit" name="save" onClick={this.save.bind(this)}>Save Draft</button>
        </div>
      </div>
    );
  }
}

export default DraftForm;
