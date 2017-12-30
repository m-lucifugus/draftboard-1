var express = require('express');
var router = express.Router();
const {Draft} = require('../models/draft');
const {Pick} = require('../models/pick');
const {ObjectId} = require('mongodb');

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
    completed: req.body.completed
  });

  draft.save().then((doc) => {
    res.send(doc)
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
      selected_by: draft.current_team_picking().name,
    });

    draft.picks.push(pick);

    draft.save().then((draft) => {
      res.send({draft})
    }, (e) => {
      res.status(400).send(e)
    });
  }).catch((e) => {
    res.status(400).send();
  })
});

module.exports = router;
