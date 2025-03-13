import React from 'react';
import Quiz from '../../../client/components/Quiz'; // Adjust the import path as needed
import { mount } from 'cypress/react';

describe('Quiz Component Test', () => {
  const sampleQuestions = [
    { id: 1, question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
    { id: 2, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin'], answer: 'Paris' },
  ];

  beforeEach(() => {
    cy.intercept('GET', '/api/questions', { body: sampleQuestions }).as('getQuestions');
  });

  it('renders the start quiz button initially', () => {
    mount(<Quiz />);
    cy.get('[data-testid="start-quiz"]').should('exist').and('be.visible');
  });

  it('starts the quiz and displays the first question when clicked', () => {
    mount(<Quiz />);
    cy.get('[data-testid="start-quiz"]').click();
    cy.get('[data-testid="question"]').should('contain', 'What is 2 + 2?');
  });

  it('allows selecting an answer and proceeding to the next question', () => {
    mount(<Quiz />);
    cy.get('[data-testid="start-quiz"]').click();

    cy.get('[data-testid="option"]').contains('4').click();
    cy.get('[data-testid="next-question"]').click();
    cy.get('[data-testid="question"]').should('contain', 'What is the capital of France?');
  });

  it('displays the final score when all questions are answered', () => {
    mount(<Quiz />);
    cy.get('[data-testid="start-quiz"]').click();

    cy.get('[data-testid="option"]').contains('4').click();
    cy.get('[data-testid="next-question"]').click();
    cy.get('[data-testid="option"]').contains('Paris').click();
    cy.get('[data-testid="next-question"]').click();

    cy.get('[data-testid="quiz-over"]').should('be.visible');
    cy.get('[data-testid="score"]').should('be.visible');
  });

  it('allows restarting the quiz after completion', () => {
    mount(<Quiz />);
    cy.get('[data-testid="start-quiz"]').click();

    cy.get('[data-testid="option"]').contains('4').click();
    cy.get('[data-testid="next-question"]').click();
    cy.get('[data-testid="option"]').contains('Paris').click();
    cy.get('[data-testid="next-question"]').click();

    cy.get('[data-testid="quiz-over"]').should('be.visible');
    cy.get('[data-testid="restart-quiz"]').click();
    cy.get('[data-testid="start-quiz"]').should('be.visible');
  });
});
