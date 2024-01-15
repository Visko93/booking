describe("Basic Funtions", () => {
  it("Writes a title", () => {
    cy.visit("http://localhost:5173/");

    // Get the title input and write a title
    cy.get('[data-testid="title"]')
      .type("My booking")
      .should("have.value", "My booking");
  });

  it("Selects a date", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="rangeDate"]').click();

    const today = new Date().getDate();
    const tomorrow = new Date().getDate() + 1;

    // Select the initial date
    cy.get('[data-testid="rangeDate"]');

    cy.get(".rdp-caption_start > .border-collapse > .rdp-tbody")
      .contains("td", today)
      .click();

    // Select the final date
    cy.get('[data-testid="rangeDate"]').click();
    cy.get(".rdp-caption_end > .border-collapse > .rdp-tbody")
      .contains("td", tomorrow)
      .click();
  });

  it("Selects a destination", () => {
    cy.visit("http://localhost:5173/");

    // Select the destination
    cy.get('[data-testid="destination"]')
      .type("tokyo")
      .get('[data-value="tokyo"]')
      .click();
  });
});

describe("Create Booking", () => {
  it("Submit a booking", () => {
    cy.visit("http://localhost:5173/");

    // Get the title input and write a title
    cy.get('[data-testid="title"]')
      .type("My booking")
      .should("have.value", "My booking");

    cy.get('[data-testid="rangeDate"]').click();

    const today = new Date().getDate();
    const tomorrow = new Date().getDate() + 1;

    // Select the initial date
    cy.get('[data-testid="rangeDate"]');

    cy.get(".rdp-caption_start > .border-collapse > .rdp-tbody")
      .contains("td", today)
      .click();

    // Select the final date
    cy.get('[data-testid="rangeDate"]').click();
    cy.get(".rdp-caption_end > .border-collapse > .rdp-tbody")
      .contains("td", tomorrow)
      .click();

    // Select the destination
    cy.get('[data-testid="destination"]')
      .type("tokyo")
      .get('[data-value="tokyo"]')
      .click();

    // Click the submit button
    cy.get('[data-testid="submit"]').click();

    // Check if the booking is created
    cy.get('[data-testid="booking"]').should("have.length", 1);
  });
});

describe("Delete Booking", () => {
  it("Delete a booking", () => {
    cy.visit("http://localhost:5173/");

    // Get the title input and write a title
    cy.get('[data-testid="title"]')
      .type("My booking")
      .should("have.value", "My booking");

    cy.get('[data-testid="rangeDate"]').click();

    const today = new Date().getDate();
    const tomorrow = new Date().getDate() + 1;

    // Select the initial date
    cy.get('[data-testid="rangeDate"]');

    cy.get(".rdp-caption_start > .border-collapse > .rdp-tbody")
      .contains("td", today)
      .click();

    // Select the final date
    cy.get('[data-testid="rangeDate"]').click();
    cy.get(".rdp-caption_end > .border-collapse > .rdp-tbody")
      .contains("td", tomorrow)
      .click();

    // Select the destination
    cy.get('[data-testid="destination"]')
      .type("tokyo")
      .get('[data-value="tokyo"]')
      .click();

    // Click the submit button
    cy.get('[data-testid="submit"]').click();

    // Check if the booking is created
    cy.get('[data-testid="booking"]').should("have.length", 1);

    // Delete the booking
    cy.get('[data-testid="delete"]').click();

    // Check if the booking is deleted
    cy.get('[data-testid="booking"]').should("have.length", 0);
  });
});

describe("Edit Booking", () => {
  it("Edit a booking", () => {
    cy.visit("http://localhost:5173/");

    // Get the title input and write a title
    cy.get('[data-testid="title"]')
      .type("My booking")
      .should("have.value", "My booking");

    cy.get('[data-testid="rangeDate"]').click();

    const today = new Date().getDate();
    const tomorrow = new Date().getDate() + 1;

    // Select the initial date
    cy.get('[data-testid="rangeDate"]');

    cy.get(".rdp-caption_start > .border-collapse > .rdp-tbody")
      .contains("td", today)
      .click();

    // Select the final date
    cy.get('[data-testid="rangeDate"]').click();
    cy.get(".rdp-caption_end > .border-collapse > .rdp-tbody")
      .contains("td", tomorrow)
      .click();

    // Select the destination
    cy.get('[data-testid="destination"]')
      .type("tokyo")
      .get('[data-value="tokyo"]')
      .click();

    // Click the submit button
    cy.get('[data-testid="submit"]').click();

    // Check if the booking is created
    cy.get('[data-testid="booking"]').should("have.length", 1);

    // Edit the booking
    cy.get('[data-testid="edit"]').click();

    // Get the title input and write a title
    cy.get('[data-testid="title"]')
      .clear()
      .type("My booking edited")
      .should("have.value", "My booking edited");

    cy.get('[data-testid="rangeDate"]').click();

    const todayEdited = new Date().getDate() + 2;
    const tomorrowEdited = new Date().getDate() + 3;

    // Select the initial date
    cy.get('[data-testid="rangeDate"]');

    cy.get(".rdp-caption_start > .border-collapse > .rdp-tbody")
      .contains("td", todayEdited)
      .click();

    // Select the final date
    cy.get('[data-testid="rangeDate"]').click();
    cy.get(".rdp-caption_end > .border-collapse > .rdp-tbody")
      .contains("td", tomorrowEdited)
      .click();

    // Select the destination
    cy.get('[data-testid="destination"]')
      .clear()
      .type("madrid")
      .get('[data-value="madrid"]')
      .click();

    // Click the submit button
    cy.get('[data-testid="submit"]').click();

    // Check if the booking is edited
    cy.get('[data-testid="booking"]').should("have.length", 1);
  });
});
