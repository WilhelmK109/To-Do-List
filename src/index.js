import './style.css';
import {
  createTask,
  deleteCompletedTasks,
  deleteTask,
  updateTask,
} from './modules/activity.js';

import {
  saveItemToLocalStorage,
  getItemFromLocalStorage,
} from './modules/storage.js';

const displayTasks = () => {
  const tasks = getItemFromLocalStorage();
  const toDoList = document.getElementById('to-do-list');
  toDoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const toDoItem = document.createElement('li');
    toDoItem.className = ('to-do-task');

    const anotherItem = document.createElement('div');
    anotherItem.className = 'another-item';

    const taskInput = document.createElement('input');
    taskInput.className = 'checkbox';
    taskInput.type = 'checkbox';
    if (task.completeted) {
      taskInput.setAttribute('checked', '');
    }

    taskInput.onchange = (e) => {
      if (e.target.checked) {
        tasks[index].completed = true;
        e.target.parentNode.children[1].classList.add('strike-through');
      } else {
        tasks[index].completed = false;
        e.target.parentNode.children[1].classList.remove('strike-through');
      }
      saveItemToLocalStorage(tasks);
    };

    anotherItem.appendChild(taskInput);

    const taskDescription = document.createElement('p');
    taskDescription.classList.add('description');
    if (task.completed) {
      taskDescription.classList.add('strike-through');
    } else {
      taskDescription.classList.remove('strike-through');
    }
    taskDescription.innerText = task.description;
    anotherItem.appendChild(taskDescription);

    const editTaskInput = document.createElement('input');
    editTaskInput.className = 'invisible';
    editTaskInput.type = 'text';
    editTaskInput.value = task.description;
    editTaskInput.addEventListener('keypress', (e) => {
      if (e.keycode === 13) {
        toDoItem.classList.toggle('set-focus-bg');
        updateTask(tasks, index, e.target.value);
        displayTasks();
      }
    });
    anotherItem.appendChild(editTaskInput);
    toDoItem.appendChild(anotherItem);

    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'invisible';
    deleteBtn.innerHTML = 'delete';
    deleteBtn.addEventListener('click', () => {
      deleteTask(tasks, index);
      displayTasks();
    });
    toDoItem.appendChild(deleteBtn);

    const anotherDelBtn = document.createElement('span');
    anotherDelBtn.className = 'material-symbols-outlined';
    anotherDelBtn.innerHTML = 'edit';
    anotherDelBtn.addEventListener('click', () => {
      anotherDelBtn.className = 'invisible';
      deleteBtn.className = 'material-symbols-outlined';

      taskDescription.className = 'invisible';
      editTaskInput.className = 'visible';
      toDoItem.classList.toggle('set-focus-bg');
      editTaskInput.focus();
    });
    toDoItem.appendChild(anotherDelBtn);
    toDoList.appendChild(toDoItem);

    const clearListBtn = document.querySelector('[clear-list-btn');
    clearListBtn.addEventListener('click', () => {
      deleteCompletedTasks(tasks);
      displayTasks();
    });
  });
};

window.addEventListener('load', () => {
  const createNewTask = document.getElementById('add-new-task');
  createNewTask.addEventListener('click', () => {
    createTask();
    displayTasks();
  });

  const taskInput = document.getElementById('to-do-input');
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      createTask();
      displayTasks();
    }
  });

  displayTasks();
});