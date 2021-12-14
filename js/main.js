// Define UI element......
let form = document.querySelector('#form-task');
let taskInput = document.querySelector('#new-task');
let filter = document.querySelector('#task-filter');
let taskList = document.querySelector('#tasks');
let clearBtn = document.querySelector('#clear-task-btn');


// Define event listeners....
form.addEventListener('submit', addTask)
taskList.addEventListener('click', removeTask)
clearBtn.addEventListener('click', clearAllTask)
filter.addEventListener('keyup', filterTask)
document.addEventListener('DOMContentLoaded', getTask)// DOMContentLoaded tokhoni kaj korbe jokhn sob text ready hoye jabe tokhon.. 


// Define functions.....

// add task..
function addTask(e){
    e.preventDefault();
    if(taskInput.value === ""){
        alert('plz Add a task')
    }else{
        let li = document.createElement('li')
        li.classList = "list"
        let link = document.createElement('a')

        li.appendChild(document.createTextNode(taskInput.value + ' '))
        taskList.appendChild(li)
        
        link.setAttribute('href', '#')
        link.innerText = 'X'
        li.appendChild(link)

        storeTaskInputStorage(taskInput.value)

        taskInput.value = ""
    }
}


// remove li task...
function removeTask(e){
    // if(e.target.hasAttribute("href")){
    //     if(confirm("Are You Sure?")){
    //         let list = e.target.parentElement
    //         // console.log(removes)
    //         list.remove()
    //         removeFromal(list)
    //     }
    // }
    let links = e.target.hasAttribute('href')
    let list = e.target.parentElement
    list.remove()
    removeFromal(list)
}


// remove clear all...
function clearAllTask(e){
    // taskList.innerHTML = ""

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    localStorage.clear()
}


// filter.....
function filterTask(e){
    let text = e.target.value.toLowerCase()
    document.querySelectorAll("li").forEach(task =>{
        let item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) !== -1){
            task.style.display = "block"
        }else{
            task.style.display = "none"
        }
    })

    console.log(text)
}





// Store in local storage......
function storeTaskInputStorage(task){
    let taskses;
    if(localStorage.getItem('taskses') == null){
        taskses = []
    }else{
        taskses = JSON.parse(localStorage.getItem('taskses'))
    }

    taskses.push(task)
    localStorage.setItem('taskses', JSON.stringify(taskses))
}



// get task.....
function getTask(){
    let taskses;
    if(localStorage.getItem('taskses') == null){
        taskses = []
    }else{
        taskses = JSON.parse(localStorage.getItem('taskses'))
    }

    taskses.forEach(task =>{
        let li = document.createElement('li')
        li.classList = "list"
        let link = document.createElement('a')

        li.appendChild(document.createTextNode(task + ' '))
        taskList.appendChild(li)
        
        link.setAttribute('href', '#')
        link.innerText = 'X'
        li.appendChild(link)
    })
}


function removeFromal(taskItem){
    let taskses;
    if(localStorage.getItem('taskses') == null){
        taskses = []
    }else{
        taskses = JSON.parse(localStorage.getItem('taskses'))
    }

    let li = taskItem
    li.removeChild(li.lastChild)
    taskses.forEach((task,index) =>{
        if(li.textContent.trim() === task){
            taskses.splice(index, 1)
        }
    })
    localStorage.setItem('taskses', JSON.stringify(taskses))
}






