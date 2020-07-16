const express = require('express');
const router = new express.Router();
const { getUsers, addUser } = require('../utils/users');
const { getMessages } = require('../utils/messages');

// returns list of user except the supplied user id
router.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const users = getUsers(id);

    res.send(users);
  } catch (e) {
    res.status(400).send();
  }
});

// adds a new user to the users collection
router.post('/users', async (req, res) => {
  let user = req.body;

  try {
    user = addUser(user.name, user.gender);
    console.log('added');
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get chats for this user Id
router.get('/users/:id/chats', async (req, res) => {
  try {
    const id = req.params.id;

    res.send(getMessages(id));
  } catch (e) {
    res.status(400).send();
    console.log('error');
  }
});

module.exports = router;
