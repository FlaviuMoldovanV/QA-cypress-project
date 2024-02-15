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
