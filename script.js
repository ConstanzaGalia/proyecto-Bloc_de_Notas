const formNotes = document.getElementById('formNotes');
const titleNoteInput = document.getElementById('titleNote');
const textAreaNoteInput = document.getElementById('textAreaNote');
const tableNotes = document.getElementById('tableNotes');
const titleNoteEdit = document.getElementById('titleNoteEdit');
const textAreaNoteEdit = document.getElementById('textAreaNoteEdit');
const formEditNote = document.getElementById('formEditNote');
let editNoteId = '';



formNotes.onsubmit = (event) => {
    //Evento para prevenir que la pagina se recargue
    event.preventDefault();
    //Traer las notas de local storage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    //Tomar los valores de la nota
    const titleNote = titleNoteInput.value;
    const textAreaNote =textAreaNoteInput.value;
    //Funcion para crear el id unico para cada nota
    const generateId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    const createdAt = Date.now();
    //Crear el objeto nota
    notes.push({
        titleNote,
        textAreaNote,
        id: generateId(), //ID
        createdAt, //Fecha de creación de la nota - con Objeto Date
    })

    //Guardar lista de usuarios en localStorage.
    localStorage.setItem('notes', JSON.stringify(notes));
    alert('Su Nota se guardó con éxito')
    formNotes.reset();
    displayNotes();
}

function displayNotes() {
    //Traer las notas de localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const cardsNotes = [];
    const date = new Date (notes.createdAt);
    
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const card = `
        <div class="card mx-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${note.titleNote}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card Category</h6>
                    <hr>
                    <p class="card-text">${note.textAreaNote}</p>
                </div>
                <div class="card-footer text-muted">${date.toLocaleString()}
        <!-- Button trigger Edit Note -->
                <button type="button" class="btn btn-sm btn-warning text-light" data-toggle="modal" data-target="#modalEditNote" onclick="uploadFormEdit('${note.id}')">
                <i class="fas fa-user-edit"></i>                
                <button onclick="deleteNote('${note.id}')" class="btn btn-sm btn-danger mx-2">
                <i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `
        cardsNotes.push(card);
    }
    tableNotes.innerHTML = cardsNotes.join('');
    // console.log(cardsNotes.join(''));
}
displayNotes();


function deleteNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    displayNotes();
}


const uploadFormEdit = (noteId) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find((note) => note.id === noteId)
    console.log("uploadFormEdit -> note", note)
    titleNoteEdit.value = note.titleNote;
    textAreaNoteEdit.value = note.textAreaNote;

}

formEditNote.onsubmit = (e) => {
    e.preventDefault();
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const title = titleNoteEdit.value;
    const textArea = textAreaNoteEdit.value;
    //Actualizar las notas en un nuevo array
    const updateNote = notes.map((note) => (
        (note.id === editNoteId) ? {...note, title, textArea} : note
        ))
        console.log("updateNote", updateNote)
    //Guardar las notas modificadas en localStorage.
    const notesEdit = JSON.stringify(updateNote);
    localStorage.setItem('notes', notesEdit);
    //Limpiar el form
    formEditNote.reset();
    //Actualizar las notas en pantalla
    displayNotes();
    //Cerrar el modal al editar la nota
    $('#formEditNote').modal('hide');
}