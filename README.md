# DEMOQA Cypress Testing

This project includes a set of automated test scripts developed using Cypress, targeting the "https://demoqa.com" website, which is a platform for practicing various front-end testing scenarios.

Key features include:

- **TextBox**: Automates the process of filling contact forms with dynamic data from the @faker-js/faker library. Includes error handling to ensure robust form submissions.
- **CheckBox**: Allows interaction with checkbox elements, including selecting random office files.
- **RadioButton**: Tests the response of radio buttons upon selection. Includes tests for "Yes" and "Impressive" options to validate the application's response to user inputs.
- **WebTables**: Handles tests for adding and deleting entries in web tables. The 'simulate search' function uses randomly selected data from the chosen column to test the search capabilities under varied conditions.
- **Buttons**: Verifies the behavior of different types of button clicks, including double click, right click, and dynamic button click. This module has been expanded to ensure each action's effect is accurately recognized by the web application.
- **Links**: Verifies link functionality and validate associated API responses, enhancing the test coverage for hyperlink interactions within the application.
- **Broken Links and Images**: Ensures images load successfully and links are accessible, further increasing the robustness of UI tests by verifying the application's response to broken images and links.
- **File Upload and Download**: Automated tests include scenarios for file upload and download, complete with cleanup tasks that remove downloaded files after testing. This ensures the test environment remains clean and ready for subsequent runs.

The code is structured with Page Object Model (POM) practices, enhancing maintainability and scalability. The addition of utilities for file handling (findFile and deleteFile) extends the project's capabilities to cover a wider range of testing scenarios.

# Updates and Enhancements
- Introduction of utilities in Cypress configuration to handle file downloads and uploads seamlessly during tests.
- Enhanced error handling and dynamic data generation with the @faker-js/faker library for more realistic test scenarios.
- Expanded test coverage to include validations of API responses, link accessibility, and image loading, ensuring comprehensive testing of web application elements.
