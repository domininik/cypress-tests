const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // cy.task('log', 'This will be output to the terminal')
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
    video: false,
    screenshotOnRunFailure: false,
  },
});
