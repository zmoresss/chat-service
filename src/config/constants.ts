module.exports = {
  CLIENT_TO_SERVER: {
    MESSAGE_SEND: 'cs:message:send',
    JOIN_CONNECTION: 'cs:connect:join'
  },

  SERVER_TO_CLIENT: {
    MESSAGE_SEND: 'sc:message:send',
    HANDSHAKE_SUCCESS: 'sc:handshake:success',
    JOIN_CONNECTION_SUCCESS: 'sc:connect:join_success',
  },

  RECEIVER_TYPE: {
    ALL: 'receive:all',
    ADMIN_ONLY: 'receive:admins',
    INTERNAL_ATTENDEES_ONLY: 'receive:internal_attendees',
  },
};