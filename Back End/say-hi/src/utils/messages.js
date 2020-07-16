const messages = [
  { sender: 1, receiver: 2, message: 'Hi man' },
  { sender: 2, receiver: 1, message: 'hello how are you' },
  { sender: 1, receiver: 3, message: 'Hi man' },
  { sender: 2, receiver: 3, message: 'hello how are you' },
];

// returns messages sent or received by this user id
const getMessages = (id) => {
  var res = messages.filter((e) => e.sender == id || e.receiver == id);

  res.forEach((e) => {
    if (e.sender == id) {
      e.me = true;
    } else {
      e.me = false;
    }
  });
  return res;
};

addMessage = (id, receiver, message) => {
  const messageObj = {
    sender: id,
    receiver: receiver,
    message: message,
    date: new Date(),
  };
  messages.push(messageObj);

  return messageObj;
};

module.exports = {
  getMessages,
  addMessage,
};

// console.log(getMessages(1, 2));
// console.log(getMessages(2, 1));
