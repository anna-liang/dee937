import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  avatar: {
    height: 20,
    width: 20,
    marginTop: 6,
  },
}));

const Messages = (props) => {
  const { lastReadMessage, messages, otherUser, userId } = props;
  const classes = useStyles();

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return (
          <> 
            {message.senderId === userId ? (
              <SenderBubble key={message.id} text={message.text} time={time} />
            ) : (
              <OtherUserBubble
                key={message.id}
                text={message.text}
                time={time}
                otherUser={otherUser}
              />
            )}
            {lastReadMessage && lastReadMessage.id === message.id && lastReadMessage.senderId === userId && (
              <Box className={classes.chatContainer}>
                <Avatar
                  alt={otherUser.username}
                  src={otherUser.photoUrl}
                  className={classes.avatar}
                />
              </Box>
            )}
          </>
          );
      })}
    </Box>
  );
};

export default Messages;
