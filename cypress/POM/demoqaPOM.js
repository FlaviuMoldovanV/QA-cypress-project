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

