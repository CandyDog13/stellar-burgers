describe('Проверяем доступность приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.visit('/');
  cy.wait(['@getIngredients']);
});

describe('Проверяем добавление ингредиента в конструктор', () => {
  it('Проверка добавления булки в конструктор', () => {
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('li')
      .contains('Краторная булка N-200i')
      .parent()
      .contains('Добавить')
      .click();
    cy.get('div').contains('Выберите булки').should('not.exist');
  });
  it('Проверка добавления начинки в конструктор', () => {
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('li')
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();
    cy.get('div').contains('Выберите начинку').should('not.exist');
  });
  it('Проверка добавления начинки-соуса в конструктор', () => {
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('li')
      .contains('Соус традиционный галактический')
      .parent()
      .contains('Добавить')
      .click();
    cy.get('div').contains('Выберите начинку').should('not.exist');
  });
});

describe('Проверка модальных окон', () => {
  it('Проверка открытия модального окна ингредиентов', () => {
    cy.get('#modals').should('not.visible');
    cy.get('li').contains('Биокотлета из марсианской Магнолии').click();
    cy.get('#modals').contains('Детали ингредиента').should('exist');
  });
  it('Проверка закрытия по клику на крестик', () => {
    cy.get('#modals').should('not.visible');
    cy.get('li').contains('Биокотлета из марсианской Магнолии').click();
    cy.get('#modals')
      .contains('Детали ингредиента')
      .should('exist')
      .parent()
      .find('button')
      .click();
    cy.get('#modals').should('not.visible');
  });
});
