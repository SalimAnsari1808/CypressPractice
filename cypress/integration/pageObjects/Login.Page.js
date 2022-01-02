/// <reference types="cypress" />

class LoginPage{

    get textboxUsername() { return '#userName'}
    get textboxPassword() { return '#password'}
    get buttonLogin() { return '#login'}

    loginToApplication(email,password){

        cy.get(this.textboxUsername).type(email)
        
        cy.get(this.textboxPassword).type(password)
        
        cy.get(this.buttonLogin).click()
        

        return this
    }

    enterUsername(email){
        cy.get(this.textboxUsername).type(email)

        return this
    }

    enterPassword(password){
        cy.get(this.textboxPassword).type(password)

        return this
    }

    clickLogin(){
        cy.get(this.buttonLogin).click()
        
        return this
    }

    navigateToBooks(){
        //cy.get(':nth-child(6) > .element-list > .menu-list > #item-2 > .text').scrollIntoView().click()

        cy.contains('Go To Book Store').click()

        return this
    }

}

module.exports = new LoginPage();