import React, { useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

const ActiveChat = ({
  user,
  conversations,
  activeConversation,
  postMessage,
  updateUnreadCount,
}) => {
  const classes = useStyles();

  const conversation = useMemo(() => { return conversations
    ? conversations.find(
        (conversation) => conversation.otherUser.username === activeConversation
      )
    : {}}, [activeConversation, conversations]);

  const isConversation = (obj) => {
    return obj !== {} && obj !== undefined;
  };

  const lastReadMessage = isConversation(conversation) 
    ? conversation.messages[conversation.messages.length - conversation.unreadCount - 1] 
    : undefined;

  let latestMessageSender = null;
  if (isConversation(conversation)) {
    const numbersOfMessages = conversation.messages.length;  
    if (numbersOfMessages > 0) {
      latestMessageSender = conversation.messages[numbersOfMessages - 1].senderId;
    }
  }

  const isUnread = isConversation(conversation) ? latestMessageSender !== user.id && conversation.unreadCount > 0 : false;
  
  useEffect(() => {
    const readMessages = async() => {
      try {
        if (isConversation(conversation)) {
          const body = { 'conversationId': conversation.id, 'unreadCount': 0};
          await updateUnreadCount(body);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (isUnread) {
      readMessages();
    }
  }, [updateUnreadCount, conversation, isUnread]);

  return (
    <Box className={classes.root}>
      {isConversation(conversation) && conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            {user && (
              <>
                <Messages
                  lastReadMessage={lastReadMessage}
                  messages={conversation.messages}
                  otherUser={conversation.otherUser}
                  userId={user.id}
                />
                <Input
                  otherUser={conversation.otherUser}
                  conversationId={conversation.id || null}
                  user={user}
                  postMessage={postMessage}
                />
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
