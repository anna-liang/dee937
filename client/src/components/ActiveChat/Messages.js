import React from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const sortMessages = (messages) => {
    return messages.sort((m1, m2) => {
      if (m1.createdAt < m2.createdAt) {
        return -1;
      }
      return 1;
    });
  }

  const messagesReverse = sortMessages(messages);

  return (
    <Box>
      {messagesReverse.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
