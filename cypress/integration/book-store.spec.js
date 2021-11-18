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

describe("Head 元素測試", () => {
  it("應該要有對的 viewport 元素", () => {
    cy.visit("http://localhost:3000");
    cy.document();
    cy.get("head meta[name='viewport']").should(
      "have.attr",
      "content",
      "initial-scale=1, width=device-width"
    );
  });
});
