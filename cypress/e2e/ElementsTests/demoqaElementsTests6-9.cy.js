/// <reference types= "cypress" />

import { Links, BrokenLinksImages } from "../../POM/demoqaPOM6-9";

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

  it.skip("Dynamic Properties", () => {});
});
