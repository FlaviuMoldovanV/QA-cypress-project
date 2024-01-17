
export class TextBox{
    
    contactForm_Completion(data) {
        cy.get('#userName').type(data.fullName);
        cy.get('#userEmail').type(data.email);
        cy.get('#currentAddress').type(data.currentAddress);
        cy.get('#permanentAddress').type(data.permanentAddress);
        cy.get('#submit').click();
    }
}

