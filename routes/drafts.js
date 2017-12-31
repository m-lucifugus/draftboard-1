var express = require('express');
var router = express.Router();
const {Draft} = require('../models/draft');
const {Pick} = require('../models/pick');
const {ObjectId} = require('mongodb');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '67112',
  key: 'ee10fbce41148d3ef784',
  secret: 'e15f21f1434f3853e949',
  cluster: 'mt1',
});

router.get('/', (req, res) => {
  // Calls find function on Todo
  Draft.find().then((drafts) => {
    // Responds with all drafts, as an object
    res.send({drafts})
    // In case of an error
  }, (e) => {
    // Responds with status code of 400
    res.status(400).send(e)
  })
})

router.post('/', (req, res) => {
  let draft = new Draft({
    title: req.body.title,
    teams: req.body.teams,
  });

  draft.save().then((draft) => {
    res.send({draft})
  }, (e) => {
    res.status(400).send(e)
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('ID is not valid');
  }

  Draft.findById(id).then((draft) => {
    if (!draft) {
      return res.status(404).send();
    }

    res.send({draft});
  }).catch((e) => {
    res.status(400).send();
  })
});

router.get('/:id/tick', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('ID is not valid');
  }

  Draft.findById(id).then((draft) => {
    if (!draft) {
      return res.status(404).send();
    }

    draft.timeLeftForCurrentPick = Math.max(draft.timeLeftForCurrentPick - 1, 0);

    draft.save().then((draft) => {
      pusher.trigger(`draft-${draft._id}`, 'tick', {draft});
      res.send({draft})
    }, (e) => {
      res.status(400).send(e)
    });

    res.send({draft});
  }).catch((e) => {
    res.status(400).send();
  })
});

router.get('/:id/pause', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('ID is not valid');
  }

  Draft.findById(id).then((draft) => {
    if (!draft) {
      return res.status(404).send();
    }

    draft.paused = !draft.paused;

    draft.save().then((draft) => {
      res.send({draft})
    }, (e) => {
      res.status(400).send(e)
    });

    res.send({draft});
  }).catch((e) => {
    res.status(400).send();
  })
});

router.post('/:id/pick', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('Draft ID is not valid');
  }

  Draft.findById(id).then((draft) => {
    if (!draft) {
      return res.status(404).send();
    }

    let pick = new Pick({
      name: req.body.name,
      position: req.body.position,
      team: req.body.team,
      selected_by: draft.current_team_picking(),
    });

    draft.picks = draft.picks.concat([pick]);
    draft.timeLeftForCurrentPick = draft.timePerPick;

    draft.save().then((draft) => {
      pusher.trigger(`draft-${draft._id}`, 'pick', {draft});
      res.send({draft})
    }, (e) => {
      res.status(400).send(e)
    });
  }).catch((e) => {
    res.status(400).send();
  })
});

module.exports = router;
