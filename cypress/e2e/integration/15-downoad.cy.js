
/// <reference types="cypress"/>
import fs from "fs";
import path from "path";

describe("File Download & File Upload", () => {
  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend");
    cy.clickCard("File Download & Upload");
  });

  const fileName = "SampleText.txt";
  const downloadPath = path.join("cypress/downloads", fileName);

  it("File Download", () => {
    cy.get("#file_download").click();

    cy.readFile(downloadPath);

    // ways to read file
    // fs.readSync()
    // cy.fixture()
    // fs.unlink('cypress/downloads/SampleText.txt')
  });

  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "File Upload" card
   * Send the path of the file as keys to the "Choose File" input box
   * Click on the "UPLOAD" button
   * Validate the result message equals "You Uploaded 'SampleText.txt'"
   */
  it("File Upload", () => {
    // .selectFile('pathOfFile')

    // Uploading multiple files
    // cy.get("#file_upload").selectFile(["path1/file.txt", "path2/file.txt"]);

    // Uploading with drag and drop
    // cy.get("#file_upload").selectFile(downloadPath, { action: "drag-drop" });

    cy.get("#file_upload").selectFile(downloadPath);
    cy.get("#file_submit").realClick();
    cy.get("#result")
      .should("be.visible")
      .should("have.text", `You uploaded ${fileName}`);
  });
});