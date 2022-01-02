

/// <reference types="cypress" />

describe("Cypress Network request testing",()=>{

    it("Test Server and Route of Cypress",()=>{

        const mockRes = {
            "data": {
                "id": 4,
                "email": "Salim.ansari",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            "support": {
                "url": "https://reqres.in/#support-heading",
                "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
            }
        }

        const rediectRes = {
            // simulate a redirect to another page
            redirect: '/api/unknown/2',
          }

        cy.server()
        cy.route("GET","/api/users/2", rediectRes).as('singleuser')
        cy.visit("https://reqres.in/")
        cy.get('[data-id="users-single"]').click()
        cy.wait('@singleuser')


    })

})