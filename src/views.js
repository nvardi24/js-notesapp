import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";
import moment from "moment";
// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // Setup the note title text

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);
  //setUp the link
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");
  //Setup the status
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);
  return noteEl;
};

// Render application notes
const renderNotes = () => {
  const notesEl = document.querySelector("#notes");
  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase()),
  );

  notesEl.innerHTML = "";
  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show.";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};
const initializeEditPage = (noteId) => {
  const titleEl = document.querySelector("#note-title");
  const bodyEl = document.querySelector("#note-body");
  const dateEl = document.querySelector("#last-edited");
  const notes = getNotes();
  const note = notes.find((note) => noteId === note.id);

  if (!note) {
    location.assign("/index.html");
  }

  titleEl.value = note.title;
  bodyEl.value = note.body;
  dateEl.textContent = generateLastEdited(note.updatedAt);
};

//Last edited message
const generateLastEdited = (timeStamp) =>
  `Last edited ${moment(timeStamp).fromNow()}`;

export { generateLastEdited, generateNoteDOM, renderNotes, initializeEditPage };
