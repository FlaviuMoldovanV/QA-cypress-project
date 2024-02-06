import {
  TextBox,
  CheckBox,
  RadioButton,
  WebTables,
  Buttons,
} from "../../POM/demoqaPOM";
/// <reference types= "cypress" />

function GenerateRandomNumber() {
  return Math.floor(Math.random() * 10 + 1);
}

describe("DEMOQA Elements Testing ", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com");
    cy.get(".card-up").first().click();
  });

  it("Fill out the Text Box contact form", () => {
    cy.get(".element-group #item-0").first().click();
    let textBox = new TextBox();
    textBox.fillContactForm();
    cy.get(".border").should("exist");
  });

  it("Select a random Office File in Check Box section", () => {
    cy.get(".element-group #item-1").first().click();
    let checkBox = new CheckBox();
    checkBox.clickRandomOfficeFile();
  });

  it("Click 'Yes' and 'Impressive' Radio Buttons", () => {
    cy.get(".element-group #item-2").first().click();
    let radioButton = new RadioButton();
    radioButton.pressBothButtons();
  });

  it("Add/delete persons, and simulate search in Web Tables", () => {
    cy.get(".element-group #item-3").first().click();
    let webTables = new WebTables();
    let randomNumber = GenerateRandomNumber();

    for (let i = 0; i < randomNumber; i++) {
      webTables.addPerson();
    }

    // You can type only : First Name,Last Name,Age,Email,Salary,Department
    webTables.simulateSearch("Email");

    for (let i = 0; i < randomNumber; i++) {
      webTables.deleteLastPerson();
    }
  });

  it("Execute double click, right click, and dynamic click actions on buttons", () => {
    cy.get(".element-group #item-4").first().click();
    let buttons = new Buttons();
    buttons.clickButtons();
  });
});
