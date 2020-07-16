const { AvatarsPath } = require('../common/constants');

const users = [];

// id is the current user, so we exclude him from the result
const getUsers = (id) => {
  return users.filter((e) => e.id != id);
};

// Sign up, adds the user to the users array
// We could skip this step by sending user info using socket.io login event
// But this is present to for the purpose of including a post request in the project
const addUser = (name, gender) => {
  const randomImage = Math.floor(Math.random() * 6) + 1;

  const user = {
    id: '',
    name: name,
    gender: gender,
    avatar: `${AvatarsPath}/${gender == 'Male' ? 'm' : 'f'}-${randomImage}.png`,
  };
  users.push(user);
  console.log(user);
  return user;
};

// when the user emits the login event we assign the user to the socket id
const assignSocketId = (name, socketId) => {
  const user = users.find((e) => e.name === name);
  user.id = socketId;
  console.log(user);
  return user;
};

// Remove the user from the array
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  getUsers,
  addUser,
  assignSocketId,
  removeUser
};
