import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadPreviewText: {
    fontSize: 12,
    letterSpacing: -0.17,
    fontWeight: "bold",
  },
  badge: {
    marginRight: 20
  },
}));

const ChatContent = ({ conversation, isUnread }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={isUnread ? classes.unreadPreviewText : classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      <Box>
        {isUnread && (
          <Badge badgeContent={conversation.unreadCount} color="primary" className={classes.badge}/>
        )}
      </Box>
    </Box>
  );
};

export default ChatContent;
