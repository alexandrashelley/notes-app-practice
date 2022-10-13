/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesModel = require("./NotesModel");
const NotesView = require("./NotesView");

describe("the notes view page", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displays a note on the page", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("This is a test note");
    view.displayNotes();

    expect(document.querySelectorAll(".note-item").length).toBe(1);
  });

  it("clears the list of notes from the page", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("This is a note to be cleared");
    view.clearNotes();

    expect(document.querySelectorAll(".note-item").length).toBe(0);
  });

  it("clicking the button adds a new note", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "This note was added with a button click";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(document.querySelectorAll(".note-item").length).toBe(1);
    expect(document.querySelector(".note-item")).not.toBeNull();
    expect(document.querySelector(".note-item").textContent).toBe(
      "This note was added with a button click"
    );
  });
});