interface Note {
    id: number;
    content: string;
}

let notes: Note[] = [];

// Load notes from local storage on page load
window.onload = () => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
        displayNotes();
    }
};

function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote() {
    const content = prompt("Enter note content:");
    if (content) {
        const newNote: Note = {
            id: notes.length + 1,
            content: content,
        };
        notes.push(newNote);
        displayNotes();
        saveNotesToLocalStorage();
    }
}

function displayNotes() {
    const notesList = document.getElementById("notes-list");
    if (notesList) {
        notesList.innerHTML = "";
        notes.forEach(note => {
            const noteElement = document.createElement("div");
            noteElement.innerHTML = `<p>${note.content}</p>
                                      <button onclick="viewNote(${note.id})">View</button>
                                      <button onclick="updateNote(${note.id})">Update</button>
                                      <button onclick="deleteNote(${note.id})">Delete</button>`;
            notesList.appendChild(noteElement);
        });
    }
}

function viewNote(id: number) {
    const selectedNote = notes.find(note => note.id === id);
    if (selectedNote) {
        window.location.href = `note.html?id=${selectedNote.id}`;
    }
}

function updateNote(id: number) {
    const selectedNote = notes.find(note => note.id === id);
    if (selectedNote) {
        const updatedContent = prompt("Update note content:", selectedNote.content);
        if (updatedContent !== null) {
            selectedNote.content = updatedContent;
            displayNotes();
            saveNotesToLocalStorage();
        }
    }
}

function deleteNote(id: number) {
    notes = notes.filter(note => note.id !== id);
    displayNotes();
    saveNotesToLocalStorage();
}
