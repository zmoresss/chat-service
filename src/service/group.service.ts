module.exports = {
  add_user_to_group,
};

function add_user_to_group (socket, event_name) {
  socket.join(event_name);
}
