// Fetch data from the localStorage
const getItemFromLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem('todos'));
  if (!data) {
    data = [];
  }
  return data;
};

// Save data in the localStorage
const saveItemToLocalStorage = (tasks) => {
  localStorage.setItem('todos', JSON.stringify(tasks));
};

export { getItemFromLocalStorage, saveItemToLocalStorage };