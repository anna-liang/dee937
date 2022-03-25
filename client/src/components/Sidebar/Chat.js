import React from 'react';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
}));

const Chat = ({ conversation, setActiveChat, updateUnreadCount }) => {
  const classes = useStyles();
  const { otherUser } = conversation;
  const numbersOfMessages = conversation.messages.length;
  let latestMessageSender = null;
  if (numbersOfMessages > 0) {
    latestMessageSender = conversation.messages[numbersOfMessages - 1].senderId;
  }

  const isUnread = latestMessageSender === otherUser.id && conversation.unreadCount > 0;

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
    if (isUnread) {
      const body = { 'conversationId': conversation.id, 'unreadCount': 0};
      await updateUnreadCount(body);
    }
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        isUnread={isUnread}
      />
    </Box>
  );
};

export default Chat;
