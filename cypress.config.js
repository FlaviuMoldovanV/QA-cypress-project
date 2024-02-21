const { defineConfig } = require("cypress");
const fs = require("fs").promises;
const path = require("path");

const downloadsFolderPath = "cypress/downloads/"; // Specify your downloads folder path

module.exports = defineConfig({
  projectId: "jiz325",
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        /**
         * @summary Finds the first file in the downloads directory.
         * @description 
         * Searches and retrieves the path of the first file found within a predefined downloads directory. 
         * By asynchronously reading the contents of the downloads folder and selecting the first file found, 
         * it allows for dynamic interaction with downloaded files without needing to hardcode file names. 
         * If no files are found in the directory, it throws an error to signal the absence of downloadable content.
         * @async
         * @returns {Promise<string>} The path of the found file.
         * @throws {Error} if no file is found/ an error occurs while reading the directory.
         */
        async findFile() {
          try {
            const files = await fs.readdir(downloadsFolderPath); // Reads the directory and assigns the first file name found to 'file'
            if (!files.length) {
              throw new Error("No file found");
            }
            const file = files[0];
            const filePath = path.join(downloadsFolderPath, file);
            return filePath; // Return the full path of the file

          } catch (err) {
            console.error("Error in findFile:", err.message);
            throw err;
          }
        },

        /**
         * @summary Deletes a specified file.
         * @description 
         * Deletes a specified file from the filesystem. 
         * This asynchronous operation ensures the file is removed and the filesystem is updated. 
         * It is primarily used in test cleanup processes to remove temporary files created during test execution.
         * @async
         * @param {string} filePath - The path of the file to delete.
         * @returns {Promise<null>} Resolves with null if the file is successfully deleted.
         * @throws {Error} If the file could not be deleted.
         */
        async deleteFile(filePath) {
          try {
            await fs.unlink(filePath); // Delete the file
            return null;
          } catch (err) {
            throw new Error(`Failed to delete file: ${err.message}`);
          }
        },
      });
    },
  },
});
