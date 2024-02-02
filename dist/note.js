"use strict";
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');
    if (noteId) {
        const noteDetails = getNoteDetails(parseInt(noteId, 10));
        displayNoteDetails(noteDetails);
    }
    else {
        // Handle case where noteId is not provided in the URL
        console.error("Note ID not provided in the URL.");
    }
};
function getNoteDetails(id) {
    return notes.find(note => note.id === id);
}
function displayNoteDetails(note) {
    const noteDetailsElement = document.getElementById("note-details");
    if (noteDetailsElement && note) {
        const noteElement = document.createElement("div");
        noteElement.innerHTML = `<p>${note.content}</p>`;
        noteDetailsElement.appendChild(noteElement);
    }
    else {
        console.error("Note details not found.");
    }
}
