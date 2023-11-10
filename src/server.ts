const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const mongoose = require('mongoose');

const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

const { PORT, ENV } = require('./config/vars.ts');
const { SERVER_TO_CLIENT } = require('./config/constants.ts');
const register_handlers = require('./handler/index.ts');

/** Express Server Instance **/
const server_instance = express();
server_instance.use(cors());

const http_server = http.createServer(server_instance);

/** MongoDB Server Instance **/
init_mongodb_instance().catch(console.dir);

http_server.listen(PORT, () => {
  console.log(`Server (${ENV}) has started and it is now listening to port ${PORT}`);
})

/** Socket Server Instance **/
const io = new Server(http_server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const all_connections = [];

const on_socket_connection = (socket) => {
  console.log('New user is trying to connect...');

  all_connections.push(socket);

  register_handlers(io, socket);

  io.sockets.emit(SERVER_TO_CLIENT.HANDSHAKE_SUCCESS);
  console.log('Handshake successful.');

  socket.on("disconnect", () => {
    all_connections.splice(all_connections.indexOf(socket), 1);
  });
};
io.on('connection', on_socket_connection);

/** API routes **/
server_instance.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

async function init_mongodb_instance() {
  try {
    mongoose.connect(
      process.env.MONGO_DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.log('Failed to connect to MongoDB.');
    console.log('Error stack =  ', err);
  }
}
