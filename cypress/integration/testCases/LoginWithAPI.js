describe('Suite to login with API method',function(){

    it('User Login with API call without using API',function(){

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
            }).its('body').then((createUserResponse)=>{
                //cy.log(JSON.stringify(createUserResponse))
                
                cy.request({
                    method : "POST", 
                    url : "https://demoqa.com/Account/v1/GenerateToken",
                    body :createUserPayload
                }).its('body').then((generateTokenResponse)=>{
                    //cy.log(JSON.stringify(generateTokenResponse))


                    // cy.log("User ID-->"+createUserResponse.userID)
                    // cy.log("Username-->"+createUserResponse.username)
                    // cy.log("Token-->"+generateTokenResponse.token)
                    // cy.log("Expires-->"+generateTokenResponse.expires)

                    cy.setCookie('userName',createUserResponse.username)
                    cy.setCookie('userID',createUserResponse.userID)
                    cy.setCookie('token', generateTokenResponse.token)
                    cy.setCookie('expires',generateTokenResponse.expires)

                    cy.visit('https://demoqa.com/books')
                })
            })

        })

    })

})