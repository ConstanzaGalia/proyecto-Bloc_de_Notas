const formNotes = document.getElementById('formNotes');
const titleNoteInput = document.getElementById('titleNote');
const textAreaNoteInput = document.getElementById('textAreaNote');
const tableNotes = document.getElementById('tableNotes');


formNotes.onsubmit = (event) => {
    //Evento para prevenir que la pagina se recargue
    event.preventDefault();
    //Traer las notas de local storage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    //Tomar los valores de la nota y generar el Id
    const titleNote = titleNoteInput.value;
    const textAreaNote =textAreaNoteInput.value;
    //Funcion para crear el id unico para cada nota
    const generateId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    //Crear el objeto nota
    notes.push({
        titleNote,
        textAreaNote,
        id: generateId(), //ID
        createdAt: Date.now(), //Fecha de creación de la nota - con Objeto Date
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

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const card = `
        <div class="card mx-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${note.titleNote}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card Category</h6>
                    <p class="card-text">${note.textAreaNote}</p>
                </div>
                <div class="card-footer text-muted">${note.createdAt}</div>
            </div>
        `
        cardsNotes.push(card);
    }
    tableNotes.innerHTML = cardsNotes.join('');
    console.log(cardsNotes.join(''));
}
displayNotes();