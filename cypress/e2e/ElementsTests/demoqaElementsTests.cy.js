import { TextBox,CheckBox } from "../../POM/demoqaPOM";
/// <reference types= "cypress" />

describe("DEMOQA Elements Testing ", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com");
    cy.get(".card-up").first().click();
  });

  it("Text Box", () => {
    cy.get(".element-group #item-0").first().click();
    let textBox = new TextBox();
    textBox.contactForm_Completion();
    cy.get('.border').should('exist');
  });

  it("Check Box", () => {
    cy.get(".element-group #item-1").first().click();
    let checkBox = new CheckBox();
    checkBox.clickRandomOfficeFile();
  });

  it.skip("Radio Button", () => {});

  it.skip("Web Tables", () => {});

  it.skip("Buttons", () => {});
});
