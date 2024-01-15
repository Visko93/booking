# Booking App Documentation

## Introduction

The Booking App is a React-based application for managing bookings. It allows users to create, read, update, and delete bookings. This documentation provides an overview of the application's architecture, code structure, and the rationale behind key code decisions.

## Application Structure

### Components

The application follows a modular structure with components organized into different directories:

- [components/ui](#): Contains UI components like `Input`, `Button`, and `Form` that are reusable across the application.
- [components/booking](#): Contains components specific to booking-related features, such as `DatePickerWithRange` and `ComboBox`.
- [components/common](#): Houses common components like `Popover`, which are used across the application.

### Hooks

- [hooks/useBooking](#): Custom hook for managing booking-related logic, such as handling form inputs, validation, and submission. This hook abstracts away complex logic from the components and promotes reusability.

### Store

- [store/BookingStore](#): MobX store for managing booking data. It provides methods to create, read, update, and delete bookings. The store maintains the state of bookings within the application.

## Code Decisions and Rationale

### MobX for State Management

We chose [MobX](#) as the state management library because of its simplicity and ease of use. MobX provides a convenient way to manage and react to changes in the application's state. The `BookingStore` is used to centralize the management of booking data.

### TypeScript for Type Safety

[TypeScript](#) was chosen to add type safety to the application. It helps catch errors during development and provides better code documentation. Interfaces and types are defined to ensure that data structures are well-defined, reducing the chances of runtime errors.

### Modularization

The application is structured into reusable components, promoting maintainability and scalability. Each component has a single responsibility, making the codebase easier to understand and extend.

### Form Handling with React Hook Form and Zod

[React Hook Form](#) was used for handling form inputs and validation. [Zod](#) was chosen to define the data schema and validation rules for booking-related data. This combination ensures a smooth and efficient form handling process.

### Component Responsiveness

To ensure a responsive user interface, components like `NavBar` were designed to adapt to different screen sizes. CSS classes from the [Tailwind CSS](#) framework were used to provide a responsive design without the need for custom CSS.

### Unique Booking IDs

For creating and updating bookings, a unique identifier (`id`) is generated based on the current timestamp when creating a new booking. This approach guarantees unique IDs and avoids conflicts in the `BookingStore`.

### Separation of Concerns

The `BookingActions` component focuses solely on managing the form and form submission logic. It abstracts away the complexities of handling form data and communicates with the `BookingStore` through a callback. This separation of concerns makes the code more maintainable and testable.

## Testing the Booking App

### Cypress End-to-End Testing

The Booking App is thoroughly tested using [Cypress](https://www.cypress.io/), an end-to-end testing framework. Cypress allows us to simulate user interactions and verify that the application functions as expected.

#### Basic Functions

1. **Writes a Title**

   - The test visits the app, finds the title input, writes a title, and verifies that the input value matches the entered title.

2. **Selects a Date**

   - This test simulates selecting initial and final dates in the date range picker. It verifies that the selected dates are displayed correctly.

3. **Selects a Destination**

   - In this test, the app selects a destination from the dropdown list by typing and clicking on an option.

#### Create Booking

4. **Submit a Booking**

   - This test covers the complete process of creating a booking. It fills in the title, selects a date range, and chooses a destination. Then, it clicks the submit button and checks if the booking is successfully created.

Additional tests should be added to cover error handling, validation, edge cases, and unit testing, but I've choose not to implement it due time constrains.

Other possibles enhacements:

- Routes
- Better validation
- Fail Screens/components
