describe('Facebook', { testIsolation: false }, () => {
    it('login', () => {
        cy.viewport(1000, 600);
        cy.visit('https://www.messenger.com/');
        cy.wait(1000);
        cy.reload();
        cy.wait(1000);
        cy.getCookie('c_user')
            .then((val) => {
            if (!val) {
                cy.get('button').contains('Allow all cookies').click();
                cy.wait(1000);
                cy.get('#email').type(Cypress.env('fb_email'));
                cy.get('#pass').type(Cypress.env('fb_password'));
                cy.get('#loginbutton').click();
                cy.wait(1000);
                cy.visit('https://www.messenger.com/t/' + Cypress.env('fb_groupId'));
                cy.wait(1000);
            }
        });
        cy.visit('https://www.messenger.com/t/' + Cypress.env('fb_groupId'));
        cy.wait(1000);
        cy.reload();
        cy.get(`[aria-label="Attach a file"]`);
        cy.wait(1000);
        // cy.screenshot();
        cy.get('body').then($body => {
            let i = 0;
            while ($body.find('div[aria-label="Remove attachment"]').length > 0 && ++i < 5) {
                $body.find('div[aria-label="Remove attachment"]').click();
                cy.wait(500);
            }
        });
        cy.get('input[type=file]').first().selectFile(Cypress.env('photos'), {
            action: 'drag-drop', force: true
        });
        cy.wait(1000);
        cy.get(`[aria-label="Press enter to send"]`).click();
        cy.wait(1000);
        //   cy.screenshot();
    });
});
//# sourceMappingURL=fb-messenger.cy.js.map