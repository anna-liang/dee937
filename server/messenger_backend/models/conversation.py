from django.db import models
from django.db.models import Q
from django.contrib.postgres.fields import HStoreField

from . import utils
from .user import User


class Conversation(utils.CustomModel):

    conversationName = models.TextField(null=False)
    users = models.ManyToManyField(User, related_name="user_conversations")
    unreadCounts = HStoreField()
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)

    # find conversation given list of user Ids
    def find_conversation(users):
        # return conversation or None if it doesn't exist
        try:
            userIds = []
            for user in users:
                userIds.append(user.id)
            return Conversation.objects.get(users__id=userIds)
        except Conversation.DoesNotExist:
            return None
