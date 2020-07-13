const express = require('express');
const router = new express.Router();
const { getUsers, addUser } = require('../utils/users');

router.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const users = getUsers(id);

    res.send(users);
  } catch (e) {
    res.status(400).send();
  }
});

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

module.exports = router;
