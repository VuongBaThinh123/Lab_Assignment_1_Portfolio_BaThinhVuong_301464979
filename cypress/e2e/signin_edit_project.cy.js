
describe('Admin Projects - Edit', () => {
  it('edits an existing project after signin', () => {


    cy.visit('/admin/projects', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluSWQiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM1NjYyOTg0LCJleHAiOjE3MzYyNjc3ODR9.8LIOuwtKqj1OlZiqkv7jPXY7lJt3LA2X3z5B0ggYy4Q'
        );
      },
    });


    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluSWQiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM1NjYyOTg0LCJleHAiOjE3MzYyNjc3ODR9.8LIOuwtKqj1OlZiqkv7jPXY7lJt3LA2X3z5B0ggYy4Q';

    // Create the project directly via API to avoid flaky UI create
    cy.request('POST', 'http://localhost:3000/api/projects', {
      title: 'Project To Edit',
      description: 'Old description',
      completion: new Date('2026-12-31').toISOString(),
    }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const id = res.body && (res.body._id || res.body.id);
      if (!id) throw new Error('Created project id not returned');

      // Visit the edit route directly to ensure the edit form loads the project
      cy.visit(`/admin/projects/${id}`, {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', token);
        },
      });

      // Wait for the form to render and edit the project
      cy.get('input', { timeout: 10000 }).first().should('be.visible').clear().type('Project Edited');
      cy.get('textarea', { timeout: 10000 }).should('be.visible').clear().type('Updated description');

      // Intercept the update and submit
      cy.intercept('PUT', `**/api/projects/${id}`).as('updateProject');
      cy.contains('Save').click();

      // Wait for update to complete
      cy.wait('@updateProject', { timeout: 10000 }).its('response.statusCode').should('be.within', 200, 299);

      // Reload the projects list to ensure UI reflects the update
      cy.visit('/admin/projects', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', token);
        },
      });

      // Find the row for the specific project by the edit link href and assert its title updated
      const href = `/admin/projects/${id}`;
      cy.get(`a[href="${href}"]`).should('exist').closest('tr').within(() => {
        cy.contains('Project Edited').should('exist');
        cy.contains('Project To Edit').should('not.exist');
      });
    });
  });
});
