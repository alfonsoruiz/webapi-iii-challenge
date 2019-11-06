const express = require('express');
const router = express.Router();
const postDB = require('./postDb');

router.get('/', (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Post information could not be retrieved' });
    });
});

router.get('/:id', (req, res) => {
  postDB
    .getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve post' });
    });
});

router.delete('/:id', (req, res) => {
  postDB
    .remove(req.params.id)
    .then(post => {
      res.status(200).json({ post });
    })
    .catch(err => {
      res.status(500).json({ error: 'Post could not be removed' });
    });
});

router.put('/:id', (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: 'Please provide text for post' });
  }

  postDB
    .update(req.params.id, req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not update post' });
    });
});

// custom middleware
/* 

- validatePost validates the body on a request to create a new post

- if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }

- if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" } 
*/

function validatePostId(req, res, next) {}

module.exports = router;
