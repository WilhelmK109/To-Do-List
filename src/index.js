import './style.css';

const toDo = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'Take a walk',
    completed: false,
    index: 1,
  },
  {
    description: 'Go to the movie club with friends',
    completed: false,
    index: 2,
  },
];

const displayToDoList = (items) => {
  const toDoList = document.getElementById('to-do-list');
  items.forEach((toDo) => {
    const toDoItem = document.createElement('li');
    toDoItem.className = ('todo-item-list');
    toDoItem.innerHTML = `<input type = "checkbox" class = "checkbox"${toDo.completed ? 'checked' : ''}></input>
    <p>${toDo.description}</p>`;
    toDoList.appendChild(toDoItem);
  });
};

window.addEventListener('load', () => {
  displayToDoList(toDo);
});