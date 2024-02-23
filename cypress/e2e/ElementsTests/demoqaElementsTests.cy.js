import {
  TextBox,
  CheckBox,
  RadioButton,
  WebTables,
  Buttons,
  Links,
  BrokenLinksImages
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

  it("Verifies Link Functionality and API Responses", () => {
    cy.get(".element-group #item-5").first().click();

    cy.get("#dynamicLink").invoke("removeAttr", "target").click();
    cy.go("back");

    let randomApi = new Links();
    randomApi.testAllAPIs();
  });

  it("Ensures Images Load Successfully and Links Are Accessible", () => {
    cy.get(".element-group #item-6").first().click();
    let check = new BrokenLinksImages();

    check.checkImages("Valid image");
    check.checkImages("Broken image");

    check.checkLinks("Click Here for Valid Link");
    check.checkLinks("Click Here for Broken Link");
  });

  it("File Upload and Download Automation Test", () => {
    cy.get(".element-group #item-7").first().click();
    cy.get("#downloadButton").click();

    // A task is used to find the file's path on the local system
    cy.task("findFile").then((filePath) => {
      cy.get("#uploadFile").selectFile(filePath);
      cy.get("#uploadedFilePath").contains(filePath);
      //Delete the file from the local system to clean up after the test
      cy.task("deleteFile", filePath);
    });
  });

  it("Wait for 5 seconds before checking for element changes", () => {
    cy.get(".element-group #item-8").first().click();

    cy.get("#enableAfter", { timeout: 5000 }).should("be.enabled");
    cy.get("#colorChange", { timeout: 5000 }).should('have.class','text-danger');
    cy.get("#visibleAfter", { timeout: 5000 }).should("be.visible");
  });
});
