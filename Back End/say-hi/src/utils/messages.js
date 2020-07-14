const messages = [
  { sender: 1, receiver: 2, message: 'Hi man' },
  { sender: 2, receiver: 1, message: 'hello how are you' },
  { sender: 1, receiver: 3, message: 'Hi man' },
  { sender: 2, receiver: 3, message: 'hello how are you' },
];

const getMessages = (sender, receiver) => {
  var res = messages.filter(
    (e) =>
      (e.sender == sender && e.receiver == receiver) ||
      (e.sender == receiver && e.receiver == sender)
  );

  res.forEach((e) => {
    if (e.sender == sender) {
      e.me = true;
    } else {
      e.me = false;
    }
  });
  return res;
};

module.exports = {
    getMessages,
};

// console.log(getMessages(1, 2));
// console.log(getMessages(2, 1));
