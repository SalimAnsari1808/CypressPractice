/// <reference types="cypress" />


describe('My First Test', () => {

  it('Gets, types and asserts', () => {

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

    cy.wrap({ email : testingEmail}).invoke('email').then((value)=>{

      cy.log("Username:"+value)

      const createUserPayload = {
        userName:value,
        password:"Testing1234@"
      }

      cy.request({
        method : "POST",
        url : "https://demoqa.com/Account/v1/User", 
        body: createUserPayload
      })
      .its('body').then((createUserResponse)=>{
        cy.log("Generated User ID:"+createUserResponse.userID)

        const generateTokenPayload = {
          userName:value,
          password:"Testing1234@"
        }

        cy.request({
          method : "POST", 
          url : "https://demoqa.com/Account/v1/GenerateToken",
          body :generateTokenPayload
        })
        .its('body').then((generateTokenResponse)=>{
            cy.log("Generated Token:"+generateTokenResponse.token) 

            const addBookHeader = {Authorization: "Bearer " + generateTokenResponse.token}
            const addBookPayload = {
              userId: createUserResponse.userID,
              collectionOfIsbns: [
                {
                  isbn: "9781449325862"
                }
              ]
            }

            cy.request({
              method : "POST",
              url : "https://demoqa.com/BookStore/v1/Books",
              headers : addBookHeader,
              body : addBookPayload
            }).its('body').then((addBookResponse)=>{
              cy.log(JSON.stringify(addBookResponse))

              cy.request({
                method : "GET",
                url : "https://demoqa.com/Account/v1/User/" + createUserResponse.userID,
                headers : addBookHeader
              }).its('body').then((userAccountResponse)=>{
                cy.log("User Account Details:"+ JSON.stringify(userAccountResponse))

                const loginPayload = {
                  userName: value, 
                  password: "Testing1234@"
                }


                cy.request({
                  method : "POST",
                  url : "https://demoqa.com/Account/v1/Login",
                  body : loginPayload
                }).then((response)=>{
                  
                  cy.visit("https://demoqa.com/login")

                  cy.get('#userName').type(value)

                  cy.get('#password').type("Testing1234@")

                  cy.get('#login').click()

                  cy.get("#delete-record-undefined").click()

                  cy.get("#closeSmallModal-ok").click()
                  
                })

                
                




              })

            })
        })

        
      })

    })

  })
})