describe('Auth flows', () => {
  it('can sign up (fallback/dummy)', () => {
    cy.visit('/signup');

    // Fill the signup form (Name, Email, Password)
    cy.get('form').within(() => {
      cy.get('input').eq(0).type('Test User');
      cy.get('input[type="email"]').type('testuser@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
    });

    // Should redirect to home
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Token should be set in localStorage
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.exist;
    });
  });

  it('can sign in with fallback admin and sign out', () => {
    // first sign out to be sure
    cy.visit('/');
    cy.window().then((win) => win.localStorage.removeItem('token'));

    cy.visit('/signin');
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Should redirect to home and have token
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.exist;
    });

    // Click sign out button in navbar
    cy.contains('Sign out').click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.be.null;
    });
  });
});
