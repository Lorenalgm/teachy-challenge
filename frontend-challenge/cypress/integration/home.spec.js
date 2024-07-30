describe('Home', () => {
    it('deve exibir o título', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Personagens dos filmes de Star Wars').should('be.visible');
    });
  
    it('deve exibir os headers', () => {
      cy.visit('http://localhost:3000');
      cy.get('.bg-blue-100').within(() => {
        const headers = ["Nome", "Altura", "N° de espaçonaves", "Filmes"];
        headers.forEach(header => {
          cy.contains(header).should('be.visible');
        });
      });
    });
  
    it('deve exibir um personagem', () => {
        cy.visit('http://localhost:3000');
        cy.wait(4000);
        cy.get('.character').contains('Luke Skywalker').should('be.visible');
    });

    it('deve exibir mais personagens ao rolar a tela', () => {
    cy.visit('http://localhost:3000');
    cy.wait(4000);
    cy.contains("Luke Skywalker").should("exist");
    cy.get('body').scrollTo('bottom', {ensureScrollable: false});
    cy.wait(4000);
    cy.contains("Anakin Skywalker").should("exist");
    });
});
  