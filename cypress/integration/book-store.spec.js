// book-store.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("首頁測試", () => {
  before(() => {
    cy.visit("/");
    cy.waitForReact();
  });
  it("head 元素內應該要有對的 viewport 屬性", () => {
    cy.document();
    cy.get("head meta[name='viewport']").should(
      "have.attr",
      "content",
      "initial-scale=1, width=device-width"
    );
  });
  it("應該要有個 App Bar", () => {
    cy.react("AppBarWithMenu").should("have.length", "1");
  });
});
