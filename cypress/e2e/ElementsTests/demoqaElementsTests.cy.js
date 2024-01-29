import { TextBox, CheckBox, RadioButton, WebTables } from "../../POM/demoqaPOM";
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
    cy.get(".border").should("exist");
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

  it("Web Tables", () => {
    cy.get(".element-group #item-3").first().click();
    let webTables = new WebTables();
    webTables.addPerson();
    webTables.addPerson();
    webTables.addPerson();

    // You can type only : First Name,Last Name,Age,Email,Salary,Department
    webTables.simulateSearch('Email');

    webTables.deleteLastPerson();
  });

  it.skip("Buttons", () => {});
});
