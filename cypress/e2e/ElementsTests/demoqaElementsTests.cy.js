import { TextBox,CheckBox,RadioButton } from "../../POM/demoqaPOM";
/// <reference types= "cypress" />

describe("DEMOQA Elements Testing ", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com");
    cy.get(".card-up").first().click();
  });

  it("Text Box", () => {
    cy.get(".element-group #item-0").first().click();
    let textBox = new TextBox();
    textBox.fillContactForm();
    cy.get('.border').should('exist');
  });

  it("Check Box", () => {
    cy.get(".element-group #item-1").first().click();
    let checkBox = new CheckBox();
    checkBox.clickRandomOfficeFile();
  });

  it("Radio Button", () => {
    cy.get(".element-group #item-2").first().click();
    let radioButton = new RadioButton();
    radioButton.pressBothButtons();
  });

  it.skip("Web Tables", () => {});

  it.skip("Buttons", () => {});
});
