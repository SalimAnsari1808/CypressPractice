
const loginPage = require('../pageObjects/Login.Page')

describe('Second suite',()=>{

    let emailValue;

    beforeEach(()=>{
        const testingEmail = ()=>{
            length = 10;
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
      
            return result
        }

        cy.wrap({ email : testingEmail}).invoke('email').then((ramdomEmail)=>{

            //store value for app login
            cy.wrap(ramdomEmail).as('text')

            const createUserPayload = {
                userName:ramdomEmail,
                password:"Testing1234@"
            }

            cy.request({
                method : "POST",
                url : "https://demoqa.com/Account/v1/User", 
                body: createUserPayload
            }).then((createUserResponse)=>{
                //createUserResponse.body.userID
                
                // const generateTokenPayload = createUserPayload

                // cy.request({
                //     method : "POST", 
                //     url : "https://demoqa.com/Account/v1/GenerateToken",
                //     body :generateTokenPayload
                // })
            })

        })
    })


    it('Second Suite First Test Case',function(){

        cy.visit("https://demoqa.com/login")

        //98.loginToApplication(this.text, "Testing1234@").navigateToBooks()
        loginPage
            .enterUsername(this.text)
            .enterPassword("Testing1234@")
            .clickLogin()
            .navigateToBooks()
    })

    it.skip('Second Suite Second test Case',function(){

        cy.visit("https://demoqa.com/login")

        loginPage.loginToApplication(this.text, "Testing1234@")

        cy.contains('Go To Book Store').click()

        cy.get('.action-buttons').each((element, value)=>{

            cy.log(element.find('span').text())
            if(element.find('span').text() === "You Don't Know JS"){
                cy.wrap(element).click()
                return false
            }
        })

        cy.contains('Back To Book Store').should('have.attr','type','button')

    })

})