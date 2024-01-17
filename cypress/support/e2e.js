// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Cypress.on('uncaught:exception', (err, runnable) => {
//     // returning false here prevents Cypress from
//     // failing the test
//     return false
//   })

Cypress.on('uncaught:exception', (err) => {
    // Check if the error message contains the specific text you want to ignore
    if (err.message.includes("Uncaught TypeError: c(...).setup is not a function")) {
      // Log the error for reference (optional)
      console.error('Ignoring error:', err.message);
      // Return true to prevent Cypress from failing the test
      return true;
    }
    // If the error message is not the one you want to ignore, let Cypress handle it
    return false;
  });