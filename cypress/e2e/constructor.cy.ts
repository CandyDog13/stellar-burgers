describe('Проверяем доступность приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.setCookie('accessToken', 'mockAccessToken');
  localStorage.setItem('refreshToken', 'mockRefreshToken');
  cy.visit('/');
  cy.wait(['@getIngredients', '@getUser']);
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
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
    cy.get('div').contains('Выберите начинку').should('exist');
    cy.get('li')
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();
    cy.get('div').contains('Выберите начинку').should('not.exist');
  });
  it('Проверка добавления начинки-соуса в конструктор', () => {
    cy.get('div').contains('Выберите начинку').should('exist');
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
    cy.get('#modals')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
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
  it('Проверка закрытия по нажатию на оверлей', () => {
    cy.get('#modals').should('not.visible');
    cy.get('li').contains('Биокотлета из марсианской Магнолии').click();
    cy.get('#modals').contains('Детали ингредиента').should('exist');
    cy.get('#modals').children().last().click('topLeft', { force: true });
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Детали ингредиента').should('not.exist');
  });
});

describe('Проверка создания заказа', () => {
  it('Тест заказа', () => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'getOrder'
    );
    cy.get('p').contains('Tester Testov').should('exist');
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('li')
      .contains('Краторная булка N-200i')
      .parent()
      .contains('Добавить')
      .click();
    cy.get('div').contains('Выберите булки').should('not.exist');
    cy.get('div').contains('Выберите начинку').should('exist');
    cy.get('li')
      .contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();
    cy.get('li')
      .contains('Соус традиционный галактический')
      .parent()
      .contains('Добавить')
      .click();
    cy.get('div').contains('Выберите начинку').should('not.exist');
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@getOrder');
    cy.get('#modals').should('not.be.empty');
    cy.get('#modals').find('h2').contains('1111').should('exist');
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('div').contains('Выберите начинку').should('exist');
  });
});
