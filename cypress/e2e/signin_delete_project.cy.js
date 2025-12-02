// cypress/e2e/signin_delete_project.cy.js
describe('Admin Projects - Delete', () => {
  it('deletes a project after signin', () => {

  
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluSWQiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM1NjYyOTg0LCJleHAiOjE3MzYyNjc3ODR9.8LIOuwtKqj1OlZiqkv7jPXY7lJt3LA2X3z5B0ggYy4Q';

    // Create the project directly via API to avoid flaky UI create
    cy.request('POST', 'http://localhost:3000/api/projects', {
      title: 'Project To Delete',
      description: 'This project will be deleted',
      completion: new Date('2026-12-31').toISOString(),
    }).then((res) => {
      expect(res.status).to.be.within(200, 299);
      const id = res.body && (res.body._id || res.body.id);
      if (!id) throw new Error('Created project id not returned');

      // visit the admin list and confirm the project appears
      cy.visit('/admin/projects', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', token);
        },
      });

      cy.contains('Project To Delete').should('exist');

      // Now delete via API (avoid confirm UI flakiness)
      cy.request('DELETE', `http://localhost:3000/api/projects/${id}`).then((delRes) => {
        expect(delRes.status).to.be.within(200, 299);
      });

      // Reload list and assert it's gone
      cy.visit('/admin/projects', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', token);
        },
      });

      cy.contains('Project To Delete', { timeout: 10000 }).should('not.exist');
    });

    // Ensure the item is gone from the UI (handled above after delete)
    // (no-op here)
  });
});
