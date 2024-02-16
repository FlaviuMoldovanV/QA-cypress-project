/// <reference types= "cypress" />

import { Links, BrokenLinksImages } from "../../POM/demoqaPOM6-9";

describe("DEMOQA Elements Testing 6-9", () => {
  beforeEach(() => {
    cy.visit("https://demoqa.com");
    cy.get(".card-up").first().click();
  });

  it.skip("Verifies Link Functionality and API Responses", () => {
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
  it.skip("Upload and Download", () => {});
  it.skip("Dynamic Properties", () => {});
});
