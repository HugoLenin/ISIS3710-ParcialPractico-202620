const TEST_USER = {
  email: "leninguz15@gmail.com",
  password: "123123",
};

function login() {
  cy.visit("/auth/login");
  cy.get("#email").type(TEST_USER.email);
  cy.get("#password").type(TEST_USER.password);
  cy.get('form button[type="submit"]').click();
  cy.url().should("include", "/plans");
}

describe("Creación de un plan", () => {
  beforeEach(() => {
    login();
  });

  it("Happy path: crea un plan con datos válidos y redirige a la lista de planes", () => {
    const planName = `Siesta Post-Parcial ${Date.now()}`;

    cy.visit("/plans/new");

    cy.get('[data-cy="name-input"]').type(planName);
    cy.get('[data-cy="description-input"]').type(
      "Plan de descanso profundo despues de sobrevivir al parcial de web. No se aceptan alarmas."
    );
    cy.get('[data-cy="price-input"]').type("10000");
    cy.get('[data-cy="duration-input"]').type("45");
    cy.get('[data-cy="address-input"]').type("Universidad de los Andes");
    cy.get('[data-cy="image-input"]').type(
      "https://picsum.photos/seed/siesta/1200/700"
    );
    cy.get('[data-cy="recommendations-input"]').type(
      "Traer almohada y mucha motivacion"
    );

    cy.get('[data-cy="submit-button"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/plans");
    cy.contains(planName).should("exist");
  });

  it("Edge case: no permite crear un plan con precio inválido", () => {
    cy.visit("/plans/new");

    cy.get('[data-cy="name-input"]').type("Plan con precio raro");
    cy.get('[data-cy="description-input"]').type(
      "Este plan intenta cobrar un precio que no tiene sentido."
    );
    cy.get('[data-cy="price-input"]').type("0");
    cy.get('[data-cy="duration-input"]').type("30");
    cy.get('[data-cy="address-input"]').type("Universidad de los Andes");
    cy.get('[data-cy="image-input"]').type(
      "https://picsum.photos/seed/error/1200/700"
    );

    cy.get('[data-cy="submit-button"]').click();

    cy.get('[data-cy="form-error"]').should("be.visible");
    cy.url().should("include", "/plans/new");
  });
});
