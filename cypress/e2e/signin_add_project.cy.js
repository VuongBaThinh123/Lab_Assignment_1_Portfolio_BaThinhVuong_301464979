
describe('Admin Projects - Add', () => {
  it('adds a new project after signin', () => {


    cy.window().then((win) => {
      win.localStorage.setItem(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluSWQiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM1NjYyOTg0LCJleHAiOjE3MzYyNjc3ODR9.8LIOuwtKqj1OlZiqkv7jPXY7lJt3LA2X3z5B0ggYy4Q'
      );
    });


    cy.visit('/admin/projects', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluSWQiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM1NjYyOTg0LCJleHAiOjE3MzYyNjc3ODR9.8LIOuwtKqj1OlZiqkv7jPXY7lJt3LA2X3z5B0ggYy4Q'
        );
      },
    });



    cy.contains('+ Add New Project').click();


    cy.get('input').first().clear().type('Cypress Project');

    cy.get('input[type="date"]').type('2025-12-01');
   
    cy.get('textarea').clear().type('Created by Cypress (add test).');


    cy.contains('Save').click();


    cy.contains('Cypress Project').should('exist');
  });
});
