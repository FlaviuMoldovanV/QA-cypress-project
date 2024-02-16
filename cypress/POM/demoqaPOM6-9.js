/// <reference types= "cypress" />

/**
 * @summary Tests link functionality and validates associated API responses.
 * @example
 * const linksTester = new Links();
 * linksTester.testAllAPIs();
 * @description
 * The testAllAPIs method intercepts GET requests directed to URLs matching "https://demoqa.com/*".
 * It then systematically clicks on each link, ensuring its functionality,
 * and verifies the API responses associated with them.
 */

export class Links {
  testAllAPIs() {
    cy.intercept("GET", "https://demoqa.com/*").as("apiRequest");
    cy.get("[href='javascript:void(0)']").each(($el) => {
      cy.wrap($el).click();
      cy.wait("@apiRequest").then((interception) => {
        let statusCode = interception.response.statusCode;
        let statusMessage = interception.response.statusMessage;
        let generatedText = `Link has responded with staus ${statusCode} and status text ${statusMessage}`;

        // Retrieve the text from the element and compare it with the generated text
        cy.get("#linkResponse")
          .invoke("text")
          .then((text) => {
            expect(text).to.equal(generatedText);
          });
      });
    });
  }
}

/**
 * @summary Ensures images load successfully and link accessibility on a webpage using Cypress.
 * @description
 * This class includes methods to check for the visibility and proper loading of images,
 * as well as the accessibility of hyperlinks on a webpage. It leverages Cypress for DOM manipulation
 * and assertions to ensure that images are not broken and that links lead to accessible URLs.
 * 
 * @example
 * const validator = new BrokenLinksImages();
 * validator.checkImages('Header Text');
 * validator.checkLinks('Header Text');
 */

export class BrokenLinksImages {
   /**
   * @summary Checks if images following a specific header are visible and properly loaded.
   * @description
   * Targets images immediately following a given header text, checking for their visibility
   * and loading status by verifying the naturalWidth property. Logs a warning for images
   * that appear to be broken or have failed to load.
   * 
   * @param {string} header - The text of the header preceding the target images.
   */
  checkImages(header) {
    cy.contains(header)
      .next("img")
      .should("be.visible")
      .then(($img) => {
        // A naturalWidth of 0 or less indicates that the image failed to load.
        if ($img[0].naturalWidth <= 0) { 
          Cypress.log({
            name: "Broken Image",
            message: "Image didn't load.",
          });
        }
      });
  }

 /**
   * @summary Verifies the accessibility of links following a specific header.
   * @description
   * Checks the accessibility of hyperlinks by attempting to send a request to the URL
   * specified in the href attribute. Logs the outcome, indicating whether the link is
   * accessible or potentially problematic based on the HTTP response status code.
   * 
   * @param {string} header - The text of the header associated with the links to validate.
   */
  checkLinks(header) {
    cy.contains(header)
      .invoke("attr", "href")
      .then((url) => {
        cy.request({
          url: url,
          failOnStatusCode: false, // Prevents Cypress from failing the test on non-2xx status codes
        }).then((response) => {
          if (response.status === 200) {
            cy.log(`SUCCESS: ${url} is accessible.`);
          } else {
            cy.log(
              `WARNING: ${url} may not be accessible. Status code: ${response.status}`
            );
          }
        });
      });
  }
}
