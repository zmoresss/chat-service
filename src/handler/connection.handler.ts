const { isNil } = require('lodash');
const {
  CLIENT_TO_SERVER,
  SERVER_TO_CLIENT,
} = require('../config/constants.ts');
const { add_user_to_group } = require('../service/group.service.ts');
const User = require('../model/User.model.ts');
const Group = require('../model/Group.model.ts');
const GroupChat = require('../model/GroupChat.model.ts');

module.exports = (io, socket) => {
  const join_connection = async (payload) => {
    const {
      eventMeetingId,
      eventMeetingName,
      users,
    } = payload;

    const query_user = User.where({ name: users[0].name, external_id: users[0].id });
    let user = await query_user.findOne();

    if (isNil(user)) {
      user = await User.create({
        external_id: users[0].id,
        name: users[0].name,
        type: 'admin',
        is_meeting_creator: true,
      });
    }

    const query_group = Group.where({ external_id: eventMeetingId, name: eventMeetingName });
    let group = await query_group.findOne();

    if (isNil(group) && users[0].isMeetingCreator) {
      group = await Group.create({
        external_id: eventMeetingId,
        name: eventMeetingName,
        creator: user,
      });
    }

    const group_chat_name = `${group.external_id}-${group.name}`;
    const query_group_chat = GroupChat.where({ unique_name: group_chat_name });
    let group_chat = await query_group_chat.findOne();

    if (isNil(group_chat) && users[0].isMeetingCreator) {
      group_chat = await GroupChat.create({
        unique_name: group_chat_name,
        group,
        users: [user],
        messages: []
      });
    }

    add_user_to_group(socket, group_chat.unique_name);
    console.log(`${user.name} has joined ${group_chat.unique_name} group.`);

    io
      .sockets
      .emit(
        SERVER_TO_CLIENT.JOIN_CONNECTION_SUCCESS,
        {
          group_chat: group_chat_name,
          messages: group_chat.messages
        }
      );

    console.log(`${user.name} has retrieved all the messages from ${group_chat.unique_name} group.`);
  }

  socket.on(CLIENT_TO_SERVER.JOIN_CONNECTION, join_connection);
}

