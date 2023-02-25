import { getItemFromLocalStorage, saveItemToLocalStorage } from './storage.js';

const createTask = () => {
  const tasks = getItemFromLocalStorage();
  const newTaskDescription = document.getElementById('to-do-input');
  const newTask = {
    description: newTaskDescription.value,
    completed: false,
    index: tasks.length + 1,
  };
  newTaskDescription.value = '';
  tasks.push(newTask);

  saveItemToLocalStorage(tasks);
};

const updateTask = (taskId, el) => {
  const tasks = getItemFromLocalStorage();
  const task = tasks.find((task) => task.id === parseInt(taskId, 10));
  if (el.hasAttribute('content-editatable')) {
    task.description = el.textContent;
  } else {
    const span = el.nextElementSimbling;
    const parent = el.closest('input');
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
      span.removeAttribute('content-editable');
      span.classList.add('complete');
    } else {
      span.setAttribute('content-editable', 'true');
      parent.classList.remove('complete');
    }
  }
  localStorage.setItem('task', JSON.stringify(this.tasks));
};

const deleteTask = (tasks, index) => {
  const newTasks = tasks.filter((task, innerIndex) => index !== innerIndex);
  for (let i = 0; i < newTasks.length; i += 1) {
    newTasks[i].index = tasks.length;
  }
  saveItemToLocalStorage(newTasks);
};

const deleteCompletedTasks = (tasks) => {
  const incomplete = tasks.filter((task) => task.completed !== true);
  for (let i = 0; i < incomplete.length; i += 1) {
    incomplete[i].index = i;
  }
  saveItemToLocalStorage(incomplete);
};

export {
  createTask, deleteCompletedTasks, deleteTask, updateTask,
};