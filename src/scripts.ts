const addTaskButton = document.querySelector('.js-add-task-button');
const taskInput = <HTMLInputElement>document.querySelector('.js-input-task');
const toDoTasks = document.querySelector('.js-todos-tasks');
const errorMessage = document.querySelector('.js-error-message')

let tasks: [];

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description:any) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task: any, index: number) => {
  return `<div class="todolist__item js-task-item ${task.completed ? 'checked' : ''}">
<div class="item__task">${task.description}</div>
<div class="todolist__buttons">
  <input class="item__checkbox js-complete-button" type="checkbox" ${task.completed ? 'checked' : ''}>
  <button class="button__delete js-delete-button" type="button" onclick="deleteTask(${index})"><svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="button__delete button__delete--image" d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill=""/>
    </svg></button>
</div>
</div>`
}

const innerHtml = () => {
  toDoTasks.innerHTML = "";
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      toDoTasks.innerHTML += createTemplate(item, index);
    })
  }
}

innerHtml();

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskButton.addEventListener('click', () => {
  if (taskInput.value.trim() !== "") {
    //@ts-ignore
    tasks.push(new Task(taskInput.value));
    taskInput.value = "";
    errorMessage.classList.remove('error');
  } else {  
    errorMessage.classList.add('error');
  }
  updateLocalStorage();
  innerHtml(); 
})

const deleteTask = (index: number) => {
  tasks.splice(index, 1);
  updateLocalStorage();
  innerHtml();
}
