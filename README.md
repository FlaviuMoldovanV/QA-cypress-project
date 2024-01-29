# DEMOQA Cypress Testing

This project includes a set of automated test scripts developed using Cypress, targeting the "https://demoqa.com" website, which is a platform for practicing various front-end testing scenarios.

Key features include:

- **TextBox**: Automates the process of filling contact forms with dynamic data from the @faker-js/faker library.
- **CheckBox**: Allows interaction with checkbox elements, including selecting random office files.
- **RadioButton**: Tests the response of radio buttons upon selection.
- **WebTables**: Handles tests for adding and deleting entries in web tables. The 'simulate search' function uses randomly selected data from the chosen column to test the search capabilities under varied conditions.
- **Buttons**: Verifies the behavior of different types of button clicks, including double click, right click, and dynamic button click.

The code is structured with Page Object Model (POM) practices, enhancing maintainability and scalability.
