const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'jiz325',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
