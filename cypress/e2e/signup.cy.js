
describe('Admin login page basic check', () => {
  it('shows the admin login form correctly', () => {
    cy.visit('/login'); 

    cy.contains('Admin Login').should('exist');


    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');


    cy.get('input[type="email"]').clear().type('admin@example.com');
    cy.get('input[type="password"]').clear().type('admin123');
    cy.contains('Login').click();
  });
});
