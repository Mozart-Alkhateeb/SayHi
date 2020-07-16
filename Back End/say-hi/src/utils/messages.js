const messages = [];

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

// Adds a new message to messages array
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
