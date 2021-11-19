// book-store.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { exists } from "fs";

describe("Head 元素測試", () => {
  it("應該要有對的 viewport 元素", () => {
    cy.visit("/");
    cy.document();
    cy.get("head meta[name='viewport']").should(
      "have.attr",
      "content",
      "initial-scale=1, width=device-width"
    );
  });
});

describe("首頁測試", () => {
  it("應該要有個 App Bar", () => {
    cy.visit("/");
    cy.waitForReact();
    cy.react("AppBarWithMenu").should("have.length", "1");
  });
});
