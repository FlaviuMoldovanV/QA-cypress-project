import { faker } from "@faker-js/faker";

/**
 * @summary Fills out a contact form with random data.
 * @example
 * const textBox = new TextBox();
 * textBox.fillContactForm();
 * @description
 * It uses the faker.js library to generate random input data,
 * ensuring a wide range of possibilities for data input.
 */
export class TextBox {
  fillContactForm() {
    cy.get("#userName").type(faker.person.fullName());
    cy.get("#userEmail").type(faker.internet.email());
    cy.get("#currentAddress").type(faker.location.streetAddress());
    cy.get("#permanentAddress").type(faker.location.streetAddress());
    cy.get("#submit").click();
  }
}

/**
 * @summary Automates selection of a random 'Office' file checkbox after navigating through the categories.
 * @example
 * const checkBox = new CheckBox();
 * checkBox.clickRandomOfficeFile();
 * @description
 * It usesCypress to automate checkbox interactions by dynamically expanding folders and selecting a random file.
 * Verification of the selection is achieved by checking the application's response for the selected file's name,
 * thereby enhancing test coverage through varied user interaction simulations.
 */
export class CheckBox {
  clickRandomOfficeFile() {
    let random = Math.floor(Math.random() * 4);
    cy.get(".rct-collapse").click();
    cy.get('label[for="tree-node-documents"]').prev().click();
    cy.get('label[for="tree-node-office"]').prev().click();
    cy.get(".rct-node-leaf").eq(random).as("officeFile").click(); // Chooses one of the four options available

    cy.get("@officeFile")
      .invoke("text")
      .then((selectedText) => {
        cy.get("#result").should(
          "contain",
          `You have selected :${selectedText.toLowerCase()}`
        );
      });
  }
}

/**
 * @summary Automates the process of selecting 'Yes' and 'Impressive' radio buttons.
 * @example
 * const radioButton = new RadioButton();
 * radioButton.pressBothButtons();
 * @description
 * Selects 'Yes' and 'Impressive' radio buttons,
 * ensuring each selection is accurately recognized by the web application.
 */

export class RadioButton {
  pressBothButtons() {
    cy.get('label[for="yesRadio"]').click();
    cy.get(".mt-3").should("contain", "You have selected Yes");
    cy.get('label[for="impressiveRadio"]').click();
    cy.get(".mt-3").should("contain", "You have selected Impressive");
  }
}

/**
 * @summary Utilises Cypress to automate actions such as adding, deleting, and searching within web tables,
 * ensuring data manipulation is accurately reflected in the web application.
 * @example
 * const webTables = new WebTables();
 * // Adding a person to the table
 * webTables.addPerson();
 * // Simulating a search within the table
 * webTables.simulateSearch("Email");
 * // Deleting the last person from the table
 * webTables.deleteLastPerson();
 * @description
 * This class provides methods to interact with web tables through Cypress,
 * facilitating the automation of adding and deleting entries, as well as simulating searches.
 * @param {string} columnName - The name of the column to search through.
 */
export class WebTables {
  //Adds a person to the web table with randomly generated data.
  addPerson() {
    cy.get(".rt-tbody .rt-tr").not(".-padRow").its("length").as("initialCount");

    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(faker.person.firstName());
    cy.get("#lastName").type(faker.person.lastName()); //
    cy.get("#userEmail").type(faker.internet.email());
    cy.get("#age").type(faker.number.int({ min: 19, max: 60 }));
    cy.get("#salary").type(faker.number.int({ min: 2000, max: 20000 }));
    cy.get("#department").type(faker.person.jobArea());
    cy.get("#submit").click();

    // Verifies that information has been added to the next empty row
    cy.get("@initialCount").then((initialCount) => {
      cy.get(".rt-tr-group")
        .eq(initialCount - 1)
        .should("not.have.class", "-padRow");
    });
  }

  //Simulates a search action in the web table using a specified column name.
  simulateSearch(columnName) {
    let columnIndex;
    // Select all header elements that do not contain 'Action' text
    cy.get(".rt-resizable-header-content")
      .not(':contains("Action")')
      .each(($el, index) => {
        // Check if the text of the current header element matches the user input
        if ($el.text() === columnName) {
          columnIndex = index;
          return false;
        }
      })
      .then(() => {
        // Throw an error if columnName is not one of the 6 choices allowed
        if (columnIndex === undefined) {
          throw new Error(
            `Column "${columnName}" not found. Please check if it's one of the 6 available columns.`
          );
        }
        let columnData = [];

        // Iterate over each row in the table
        cy.get(".rt-tr-group")
          .not(":has(.-padRow)")
          .each(($row, index) => {
            columnData[index] = $row.find(".rt-td").eq(columnIndex).text();
          })
          .then(() => {
            //Generate a random index to simulate more realistic and varied interactions with the table data.
            let randomNumber = Math.floor(Math.random() * columnData.length);
            cy.log(columnData);
            cy.get("#searchBox").type(`${columnData[randomNumber]}`);
            cy.get("#searchBox").clear();
          });
      });
  }

  deleteLastPerson() {
    cy.get('[title="Delete"]').last().click();
  }
}

/**
 * @summary Provides methods to perform actions like double click, right click, and dynamic click on buttons,
 * facilitating verification of each action's effect on the web application.
 * @example
 * const buttons = new Buttons();
 * buttons.clickButtons(); // Executes double click, right click, and dynamic click actions.
 * @description
 * Automates interactions with button elements by executing predefined actions (double click, right click, and dynamic click),
 * ensuring each action is properly executed and acknowledged by the web application.
 * It enhances the robustness of automated UI tests by verifying the application's response to these interactions.
 */
export class Buttons {
  clickButtons() {
    cy.get("#doubleClickBtn").dblclick();
    cy.get("#doubleClickMessage").should(
      "contain",
      "You have done a double click"
    );
    cy.get("#rightClickBtn").rightclick();
    cy.get("#rightClickMessage").should(
      "contain",
      "You have done a right click"
    );
    //The button's ID changes every time
    cy.get(".btn-primary").eq(2).click();
    cy.get("#dynamicClickMessage").should(
      "contain",
      "You have done a dynamic click"
    );
  }
}
