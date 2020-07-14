const express = require('express');
const router = new express.Router();
const { getUsers, addUser } = require('../utils/users');
const { getMessages } = require('../utils/messages');

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

router.get('/users/:id/chats/:chatId', async (req, res) => {
  try {
    const sender = req.params.id;
    const receiver = req.params.chatId;
    // console.log(id, chatId);

    res.send(getMessages(sender, receiver));
  } catch (e) {
    res.status(400).send();
    console.log('error');
  }
});

module.exports = router;
