// book-store.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("第一個測試", () => {
  it("首頁會顯示 Hello World", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Hello World");
  });
});
