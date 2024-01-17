import { TextBox } from "../../POM/demoqaPOM";
/// <reference types= "cypress" />

describe("DEMOQA Elements Testing ", () => {

  beforeEach(() => {
    cy.visit("https://demoqa.com");
    cy.get(".card-up").first().click();
  });

  it("Text Box", () => {
    cy.get(".element-group #item-0").first().click();
    cy.url().should("include", "/text-box");
    let textBox = new TextBox();
    textBox.contactForm_Completion(); 
  });

  it.skip("Check Box", () => {});

  it.skip("Radio Button", () => {});

  it.skip("Web Tables", () => {});

  it.skip("Buttons", () => {});
});
