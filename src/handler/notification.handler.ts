module.exports = (io, socket) => {
  const receive_notification = (payload) => {
    // ...
  }

  const open_notification = (payload) => {
    // ...
  }

  socket.on('notification:receive', receive_notification);
  socket.on('notification:receive', open_notification);
}