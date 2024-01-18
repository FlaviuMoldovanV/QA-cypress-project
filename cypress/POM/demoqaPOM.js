import { faker } from '@faker-js/faker';

export class TextBox{
    
    contactForm_Completion() {
        cy.get('#userName').type(faker.person.fullName());
        cy.get('#userEmail').type(faker.internet.email());
        cy.get('#currentAddress').type(faker.location.streetAddress());
        cy.get('#permanentAddress').type(faker.location.streetAddress());
        cy.get('#submit').click();
    }
}

export class CheckBox{

    clickRandomOfficeFile(){
    let random = Math.floor(Math.random() * 4);
    cy.get(".rct-collapse").click();
    cy.get('label[for="tree-node-documents"]').prev().click();
    cy.get('label[for="tree-node-office"]').prev().click();
    cy.get(".rct-node-leaf").eq(random).as("officeFile").click(); // Chooses one of the four options available

    cy.get("@officeFile").invoke("text").then((selectedText) => {
        cy.get("#result").should("contain",`You have selected :${selectedText.toLowerCase()}`);
      });
    }
}

