/// <reference types="cypress" />
import React from 'react';
import Messages from '../../src/components/ActiveChat/Messages';
import ChatContent from '../../src/components/Sidebar/ChatContent';
import { mount } from '@cypress/react';


describe("Read status", () => {

    it("read status avatar renders when read", () => {
        const lastReadMessage = {
            id: 2,
            messageText: "world",
            senderId: 1
        };
        const messages = [
            {
            id: 1,
            text: "Hello",
            senderId: 1,
            createdAt: Date.now()
        }, {
            id: 2,
            text: "world",
            senderId: 1,
            createdAt: Date.now()
        }];
        const otherUser = {
            username: "thomas",
            photoUrl: "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png"
        };
        const userId = 1;

        mount(
            <Messages
            id="messages"
            lastReadMessage={lastReadMessage}
            messages={messages}
            otherUser={otherUser}
            userId={userId}
            />
        )

        cy.get('img').should('have.attr', 'src', otherUser.photoUrl);
    });

    it("read status avatar does not render when unread", () => {
        const lastReadMessage = undefined;
        const messages = [
            {
            id: 1,
            text: "Hello",
            senderId: 1,
            createdAt: Date.now()
        }, {
            id: 2,
            text: "world",
            senderId: 1,
            createdAt: Date.now()
        }];
        const otherUser = {
            username: "thomas",
            photoUrl: "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png"
        };
        const userId = 1;

        mount(
            <Messages
            id="messages"
            lastReadMessage={lastReadMessage}
            messages={messages}
            otherUser={otherUser}
            userId={userId}
            />
        )

        cy.get('img').should('not.exist');
    });

    it("notification count renders when unread", () => {
        const otherUser = {
            username: "thomas",
        };
        const conversation = {
            id: 1,
            latestMessageText: "Hello",
            otherUser: otherUser,
            unreadCount: 3
        }

        mount(
            <ChatContent
            conversation={conversation}
            isUnread={true}
            />
        );

        cy.contains(conversation.unreadCount);
    });

    it("notification count does not render when read", () => {
        const otherUser = {
            username: "thomas",
        };
        const conversation = {
            id: 1,
            latestMessageText: "Hello",
            otherUser: otherUser,
            unreadCount: 0
        }

        mount(
            <ChatContent
            conversation={conversation}
            isUnread={true}
            />
        );

        cy.contains(conversation.unreadCount).should('not.be.visible');
    });
});