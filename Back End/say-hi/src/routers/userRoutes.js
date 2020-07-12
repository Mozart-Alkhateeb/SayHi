const express = require('express');
const router = new express.Router();
const { getUsers } = require('../utils/users');

router.get('/users', async (req, res) => {
  try {
    const users = getUsers();

    // res.set('Content-Type', 'image/png');
    res.send(users);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;