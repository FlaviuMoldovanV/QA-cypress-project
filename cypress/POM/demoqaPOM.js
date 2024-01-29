import { faker } from "@faker-js/faker";

export class TextBox {
  fillContactForm() {
    cy.get("#userName").type(faker.person.fullName());
    cy.get("#userEmail").type(faker.internet.email());
    cy.get("#currentAddress").type(faker.location.streetAddress());
    cy.get("#permanentAddress").type(faker.location.streetAddress());
    cy.get("#submit").click();
  }
}

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

export class RadioButton {
  pressBothButtons() {
    cy.get('label[for="yesRadio"]').click();
    cy.get(".mt-3").should("contain", "You have selected Yes");
    cy.get('label[for="impressiveRadio"]').click();
    cy.get(".mt-3").should("contain", "You have selected Impressive");
  }
}

export class WebTables {
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
