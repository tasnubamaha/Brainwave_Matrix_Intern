// ui element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearButton = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');


// event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearButton.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

// functions
// add task

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
    }else{
        // creating li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        li.style.color = 'white';
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.style.textDecoration = 'none';
        link.innerHTML = '🗑️';
        li.appendChild(link);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';
    }
    e.preventDefault();
}


// remove task
function removeTask(e){
    if(e.target.hasAttribute("href")){
    if(confirm("Are you sure?")){
        let ele = e.target.parentElement;
        ele.remove();
        removeFromLS(ele);
    }
    }
}


// clear task
function clearTask(e){
    // faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}


// filter

function filterTask(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
 }  else{
    task.style.display = 'none';
 }
    });
}


// store in local storage

function storeTaskInLocalStorage(task){
 let tasks;
 if(localStorage.getItem('tasks') === null){
    tasks = [];
 }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
 }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
       tasks = [];
    }else{
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.style.textDecoration = 'none';
        link.innerHTML = '🗑️';
        li.appendChild(link);
        taskList.appendChild(li);
    });  
}

function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
       tasks = [];
    }else{
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
     if(li.textContent.trim() === task){
        tasks.splice(index, 1);
     }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}