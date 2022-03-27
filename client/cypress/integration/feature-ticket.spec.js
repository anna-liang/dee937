/// <reference types="cypress" />

const alice = {
    username: "Alice",
    email: "alice@example.com",
    password: "Z6#6%xfLTarZ9U",
  };
  const bob = {
    username: "Bob",
    email: "bob@example.com",
    password: "L%e$xZHC4QKP@F",
  };
  
  describe("Feature: Implement a read status for messages", () => {
    it("setup", () => {
      cy.signup(alice.username, alice.email, alice.password);
      cy.logout();
      cy.signup(bob.username, bob.email, bob.password);
      cy.logout();
    });

    it("new messages are unread for recipient in new conversation", () => {
      cy.login(alice.username, alice.password);
  
      cy.get("input[name=search]").type("Bob");
      cy.contains("Bob").click();
  
      cy.get("input[name=text]").type("First message{enter}");
      cy.get("input[name=text]").type("Second message{enter}");
      cy.get("input[name=text]").type("Third message{enter}");

      cy.contains("First message").then(() => {
        // Select the message list DOM by finding the closest common ancestor
        // between two messages.
        const $firstMessage = Cypress.$(':contains("First message")');
        const $secondMessage = Cypress.$(':contains("Second message")');
        const $list = $firstMessage.parents().has($secondMessage).first();
  
        // Verify message list DOM contains only the three messages
        cy.wrap($list).children().should("have.length", 3);
      });
    });

    it("display number of unread messages in a conversation", () => {
      cy.reload();
      cy.login(bob.username, bob.password);

      cy.contains("Alice").then(() => {
        // Select the chat list DOM by finding the closest common ancestor
        // between username, latest message, and notification count.
        const $username = Cypress.$(':contains("Alice")');
        const $latestMessage = Cypress.$(':contains("Third message")');
        const $userMessage = $username.parents().has($latestMessage).first();
        const $unreadCount = Cypress.$(':contains("3")');
        const $chat = $userMessage.parents().has($unreadCount).first();

        cy.wrap($userMessage).children().eq(0).should("contain", "Alice");
        cy.wrap($userMessage).children().eq(1).should("contain", "Third message");
        cy.wrap($chat).children().eq(1).should("contain", "3");
      });
    });

    it("messages are read when recipient opens conversation", () => {
      cy.login(bob.username, bob.password);
      cy.contains("Alice").click();

      cy.logout();
      cy.login(alice.username, alice.password);
      cy.contains("Bob").click();
    
        cy.contains("First message").then(() => {
          // Select the message list DOM by finding the closest common ancestor
          // between two messages.
          const $firstMessage = Cypress.$(':contains("First message")');
          const $secondMessage = Cypress.$(':contains("Second message")');
          const $list = $firstMessage.parents().has($secondMessage).first();
    
          // Verify message list DOM contains the three messages and avatar for read status
          cy.wrap($list).children().should("have.length", 4);
        });
    });

    it("new messages are unread for recipient in existing conversation", () => {
      cy.login(bob.username, bob.password);
      cy.contains("Alice").click();

      cy.get("input[name=text]").type("Fourth message{enter}");
      cy.get("input[name=text]").type("Fifth message{enter}");
      cy.get("input[name=text]").type("Sixth message{enter}");
      
      cy.contains("First message").then(() => {
        // Select the message list DOM by finding the closest common ancestor
        // between two messages.
        const $firstMessage = Cypress.$(':contains("First message")');
        const $secondMessage = Cypress.$(':contains("Second message")');
        const $list = $firstMessage.parents().has($secondMessage).first();
  
        // Verify message list DOM contains the six messages and avatar for read status
        cy.wrap($list).children().should("have.length", 7);
      });
    });
  
  });
  