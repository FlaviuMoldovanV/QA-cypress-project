/// <reference types= "cypress" />

import { Links } from "../../POM/demoqaPOM6-9";

describe("DEMOQA Elements Testing 6-9", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com");
    cy.get(".card-up").first().click();
  });

  it("Verifies Link Functionality and API Responses", () => {
    cy.get(".element-group #item-5").first().click();

    cy.get("#dynamicLink").invoke("removeAttr", "target").click();
    cy.go("back");

    let randomApi = new Links();
    randomApi.testAllAPIs();
  });
  it.skip("Broken Links - Images", () => {});
  it.skip("Upload and Download", () => {});
  it.skip("Dynamic Properties", () => {});
});
