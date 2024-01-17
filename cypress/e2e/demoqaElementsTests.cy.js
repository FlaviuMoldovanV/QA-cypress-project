import { TextBox } from "./demoqaPOM";
/// <reference types= "cypress" />

describe("DEMOQA Elements Testing ", () => {

  beforeEach(() => {
    cy.visit("https://demoqa.com");
    cy.get(".card-up").first().click();
  });

  before(() => {
    cy.fixture('formData').as('formData');
  });

  it("Text Box", () => {
    cy.get(".element-group #item-0").first().click();
    cy.url().should("include", "/text-box");
    cy.get('@formData').then((formData) => {
      let textBox = new TextBox();
      textBox.contactForm_Completion(formData);
    }); 
  });

  it.skip("Check Box", () => {});

  it.skip("Radio Button", () => {});

  it.skip("Web Tables", () => {});

  it.skip("Buttons", () => {});
});
