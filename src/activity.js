const getItemFromLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem('tasks'));
  if (!data) {
    data = [];
  }
  return data;
};

const saveItemToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

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

const updateTask = (tasks, index, value) => {
  tasks[index].description = value;

  saveItemToLocalStorage(tasks);
};

const deleteTask = (tasks, index) => {
  const newTasks = tasks.filter((task, innerIndex) => index !== innerIndex);
  for (let i = 0; i < newTasks.length; i += 1) {
    newTasks[i].index = i;
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
  createTask,
  saveItemToLocalStorage,
  getItemFromLocalStorage,
  deleteCompletedTasks,
  deleteTask,
  updateTask,
};
