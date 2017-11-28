import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Drafts from './Drafts';
import DraftInfo from './DraftInfo';
import Pick from './Pick';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/drafts/:id/pick" component={Pick}/>
          <Route path="/drafts/:id/board" component={Board}/>
          <Route path="/drafts/:id" component={DraftInfo}/>
          <Route path="/drafts" component={Drafts}/>
          <Redirect to='/drafts'/>
        </Switch>
      </Router>
    );
  }
}

export default App;
