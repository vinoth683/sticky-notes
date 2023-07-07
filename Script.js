const containerElement = document.getElementById("container");
const btnAdd = document.getElementsByClassName("btn-add")[0];

function getStorageApp() {
    return JSON.parse(localStorage.getItem("vinoth-app") || "[]");
}

getStorageApp().forEach(element => {
    const textElement = createTextElement(element.id, element.content);
    containerElement.insertBefore(textElement,btnAdd);
});

function createTextElement(id,content) {
    const textElement = document.createElement("textarea");
    textElement.classList.add("box");
    textElement.value = content;
    textElement.placeholder='Enter Your Notes';

textElement.addEventListener("change",()=>{
    updateNote(id,textElement.value)
});

textElement.addEventListener("dblclick", () =>{
    const check = confirm("Are You Sure to delete ?");
    if(check){
        deleteNotes(id,textElement);
    }
     
});

return textElement;
}

function addSticky(){
    const notes =getStorageApp();
   
    const notesObject ={
        id:Math.floor(Math.random()*100000),
        content:""
    }
    const textElement = createTextElement(notesObject.id,notesObject.content);
    containerElement.insertBefore(textElement,btnAdd);
    notes.push(notesObject); 
    saveNotes(notes);
}

btnAdd.addEventListener('click',()=>addSticky()); 

function saveNotes(notes){
    localStorage.setItem("vinoth-app",JSON.stringify(notes));
}


function updateNote(id,content){
    const notes = getStorageApp();
    const updateElement = notes.filter((note)=>note.id==id)[0];
    updateElement.content=content;
    saveNotes(notes);
}

function deleteNotes(id,textElement){
    const notes = getStorageApp().filter((note)=>note.id!=id);
    saveNotes(notes);
    containerElement.removeChild(textElement);
}