import './style.css';
import {
  createTask,
  saveItemToLocalStorage,
  getItemFromLocalStorage,
  deleteCompletedTasks,
  deleteTask,
} from './activity.js';

const displayTasks = () => {
  const tasks = getItemFromLocalStorage();
  const toDoList = document.getElementById('to-do-list');
  toDoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const toDoItem = document.createElement('li');
    toDoItem.className = ('to-do-item-list');

    const anotherItem = document.createElement('div');
    anotherItem.className = 'another-item';

    const taskInput = document.createElement('input');
    taskInput.className = 'checkbox';
    taskInput.type = 'checkbox';
    if (task.completeted) {
      taskInput.setAttribute('checked', '');
    }

    taskInput.onclick = (e) => {
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
    toDoItem.appendChild(anotherItem);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = 'delete';
    deleteBtn.addEventListener('click', () => {
      deleteTask(tasks, index);
      displayTasks();
    });
    anotherItem.appendChild(deleteBtn);
    toDoList.appendChild(toDoItem);

    const clearListBtn = document.querySelector('[clear-list-btn');
    clearListBtn.addEventListener('click', () => {
      deleteCompletedTasks(tasks);
      displayTasks();
    });
  });
};

window.addEventListener('load', () => {
  const createNewTask = document.getElementById('addBtn');
  createNewTask.addEventListener('click', () => {
    createTask();
    displayTasks();
  });

  const todoInput = document.getElementById('to-do-input');
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      createTask();
      displayTasks();
    }
  });

  displayTasks();
});