const register_chat_handlers = require("./chat.handler.ts");
const register_connection_handlers = require("./connection.handler.ts");
const register_notification_handlers = require("./notification.handler.ts");

module.exports = (io, socket) => {
  register_chat_handlers(io, socket);
  register_connection_handlers(io, socket);
  register_notification_handlers(io, socket);
}