describe('Tech Quiz End-to-End Test', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/questions*', {
      statusCode: 200,
      body: [
        {
          question: "What is 2 + 2?",
          answers: [
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: true },
            { text: "5", isCorrect: false }
          ]
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true }
          ]
        }
      ]
    }).as('getQuestions');

    cy.visit('/');

    cy.document().then((doc) => {
      expect(doc.readyState).to.eq('complete');
    });

    cy.get('button').then(($buttons) => {
      cy.log('Buttons found:', $buttons.length);
      cy.log('Button Text:', $buttons.text());
    });


    cy.get('button').contains(/Start Quiz/i).should('be.visible').should('exist');
  });

  it('should start the quiz when the start button is clicked', () => {
    cy.get('button').contains(/Start Quiz/i).click();

    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should navigate through all quiz questions', () => {
    cy.get('button').contains(/Start Quiz/i).click();


    for (let i = 0; i < 2; i++) {
      cy.get('.btn-primary').first().click();
    }

  });

  it('should display the final score when the quiz is over', () => {
    cy.get('button').contains(/Start Quiz/i).click();


    for (let i = 0; i < 2; i++) {
      cy.get('.btn-primary').first().click();
    }


  });

  it('should allow restarting the quiz after completion', () => {
    cy.get('button').contains(/Start Quiz/i).click();


    for (let i = 0; i < 2; i++) {
      cy.get('.btn-primary').first().click();
    }

    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });
});
