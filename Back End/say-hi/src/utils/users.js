const { AvatarsPath } = require('../common/constants');

const users = [
  {
    userId: 1,
    name: 'Mike',
    avatar: `${AvatarsPath}/m-1.png`,
  },
  {
    userId: 2,
    name: 'Jack',
    avatar: `${AvatarsPath}/m-2.png`,
  },
  {
    userId: 3,
    name: 'Sam',
    avatar: `${AvatarsPath}/m-3.png`,
  },
  {
    userId: 4,
    name: 'Joe',
    avatar: `${AvatarsPath}/m-4.png`,
  },
  {
    userId: 5,
    name: 'Robin',
    avatar: `${AvatarsPath}/m-5.png`,
  },
  {
    userId: 6,
    name: 'Rob',
    avatar: `${AvatarsPath}/m-6.png`,
  },
  {
    userId: 7,
    name: 'Yara',
    avatar: `${AvatarsPath}/f-1.png`,
  },
  {
    userId: 8,
    name: 'Maya',
    avatar: `${AvatarsPath}/f-2.png`,
  },
  {
    userId: 9,
    name: 'Warda',
    avatar: `${AvatarsPath}/f-3.png`,
  },
  {
    userId: 10,
    name: 'Linda',
    avatar: `${AvatarsPath}/f-4.png`,
  },
  {
    userId: 11,
    name: 'Jessi',
    avatar: `${AvatarsPath}/f-5.png`,
  },
  {
    userId: 12,
    name: 'Jasmine',
    avatar: `${AvatarsPath}/f-6.png`,
  },
];

const getUsers = () => {
  return users;
};

module.exports = {
  getUsers,
};
