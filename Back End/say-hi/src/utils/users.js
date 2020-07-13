const { AvatarsPath } = require('../common/constants');

const users = [];

// const users = [
//   {
//     userId: 1,
//     socketId: null,
//     name: 'Mike',
//     avatar: `${AvatarsPath}/m-1.png`,
//   },
//   {
//     userId: 2,
//     socketId: null,
//     name: 'Jack',
//     avatar: `${AvatarsPath}/m-2.png`,
//   },
//   {
//     userId: 3,
//     socketId: null,
//     name: 'Sam',
//     avatar: `${AvatarsPath}/m-3.png`,
//   },
//   {
//     userId: 4,
//     socketId: null,
//     name: 'Joe',
//     avatar: `${AvatarsPath}/m-4.png`,
//   },
//   {
//     userId: 5,
//     socketId: null,
//     name: 'Robin',
//     avatar: `${AvatarsPath}/m-5.png`,
//   },
//   {
//     userId: 6,
//     socketId: null,
//     name: 'Rob',
//     avatar: `${AvatarsPath}/m-6.png`,
//   },
//   {
//     userId: 7,
//     socketId: null,
//     name: 'Yara',
//     avatar: `${AvatarsPath}/f-1.png`,
//   },
//   {
//     userId: 8,
//     socketId: null,
//     name: 'Maya',
//     avatar: `${AvatarsPath}/f-2.png`,
//   },
//   {
//     userId: 9,
//     socketId: null,
//     name: 'Warda',
//     avatar: `${AvatarsPath}/f-3.png`,
//   },
//   {
//     userId: 10,
//     socketId: null,
//     name: 'Linda',
//     avatar: `${AvatarsPath}/f-4.png`,
//   },
//   {
//     userId: 11,
//     socketId: null,
//     name: 'Jessi',
//     avatar: `${AvatarsPath}/f-5.png`,
//   },
//   {
//     userId: 12,
//     socketId: null,
//     name: 'Jasmine',
//     avatar: `${AvatarsPath}/f-6.png`,
//   },
// ];

const getUsers = (id) => {
  return users.filter((e) => e.id != id);
};

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

const assignSocketId = (name, socketId) => {
  const user = users.find((e) => e.name === name);
  user.id = socketId;
  console.log(user);
  return user;
};

// const getUserBySocketId = (socketId) => {
//   return users.find((user) => user.socketId === socketId);
// };

// const assignSocketToUser = (socketId) => {
//   for (let index = 0; index < users.length; index++) {
//     if (users[index].socketId == null) {
//       users[index].socketId = socketId;
//       break;
//     }
//   }

//   users.forEach((user) => {});
// };

module.exports = {
  getUsers,
  addUser,
  assignSocketId,
};
