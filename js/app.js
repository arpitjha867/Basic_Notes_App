console.log(`welcome`)
showNotes()

//if user add notes the store that in the local storage

let addBtn = document.getElementById('addBtn')
addBtn.addEventListener(`click`, func1)

function func1(element) {
    let addTxt = document.getElementById('addTxt')
    let addTitle = document.getElementById('addTitle')
    let notes = localStorage.getItem('notes')
    let titles = localStorage.getItem('titles')
    let notesObj
    let titlesObj
    if (notes == null ) {
        notesObj = []
        titlesObj=[]

    } else {
        notesObj = JSON.parse(notes)
        titlesObj=JSON.parse(titles)
    }
    notesObj.push(addTxt.value)
    titlesObj.push(addTitle.value)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    localStorage.setItem('titles', JSON.stringify(titlesObj))
    addTxt.value = ""
    addTitle.value=""
    console.log(notesObj)
    showNotes()
    
}
function showNotes() {
    let notes = localStorage.getItem('notes')
    let titles = localStorage.getItem('titles')
    let notesObj
    let titlesObj
    if (notes == null) {
        notesObj = []
        titlesObj=[]
    } else {
        notesObj = JSON.parse(notes)
        titlesObj=JSON
        .parse(titles)
    }
    let html = ""
    notesObj.forEach(function (element,index) {
        let currTitle=titlesObj[index]
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${currTitle}</h5>
            <p class="card-text">${element}</p>
            <button  class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete</button>
        </div>
        </div>
        `
    });
    
    let ele=document.getElementById('notes')
    if(notesObj.length!=0){
        ele.innerHTML=html
    }else{
        ele.innerHTML=`Nothing to show!`
    }
}
// deleting note
function deleteNote(index){
    console.log(`delete button fired for index :${index}`)
    let notes = localStorage.getItem('notes')
    let titles = localStorage.getItem('titles')
    let notesObj
    let titlesObj
    if (notes == null) {
        notesObj = []
        titlesObj=[]
    } else {
        notesObj = JSON.parse(notes)
        titlesObj = JSON.parse(titles)
    }
    notesObj.splice(index,1)
    titlesObj.splice(index,1)
    localStorage.setItem('notes',JSON.stringify(notesObj))
    localStorage.setItem('titles',JSON.stringify(titlesObj))
    showNotes()
}

//search functionality

let searchField = document.getElementById('searchTxt')

searchField.addEventListener(`input`,function(){
    let inputVal=searchField.value.toLowerCase()
    console.log(`input event fired`,inputVal)
    let noteCards=document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText
        if(cardTxt.includes(inputVal)){
            element.style.display="block"
        }else{
            element.style.display="none"
        }
    })
})

