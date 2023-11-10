const {
  CLIENT_TO_SERVER,
  RECEIVER_TYPE,
} = require('../config/constants.ts');

module.exports = (io, socket) => {
  const send_message = (payload) => {

  io
    .sockets
    .to(payload.event_name)
    .emit(
      RECEIVER_TYPE.ALL,
      {
        event: payload.event_name,
        from: payload.from,
        body: payload.body
      }
    );
  };

  socket.on(CLIENT_TO_SERVER.MESSAGE_SEND, send_message);
}