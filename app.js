// DOM elements
const theme = document.getElementById('theme');
const themeIcon = document.getElementById('theme-icon');
const darkBg = document.querySelector('.dark-bg');
const form = document.getElementById('form');
const todoInput = document.getElementById('todo-input');
const listContainer = document.querySelector('.item-content');
const itemFooter = document.querySelector('.item-footer');
const itemsLength = document.getElementById('items-Length');
const clearAllBtn = document.getElementById('clearAll');
const activeBtn = document.getElementById('active');
const allIBtn = document.getElementById('all');
const completedBtn = document.getElementById('completed');

// Initial todo list
let list = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Ignore empty input
  if (todoInput.value === '') {
    return;
  }

  // Create new todo item
  let todo = {
    id: new Date().getTime().toString(),
    name: todoInput.value,
    completed: false,
  };

  // Add new todo to list and clear input
  list = [...list, todo];
  todoInput.value = '';

  // Create new todo DOM element
  let div = document.createElement('div');
  div.classList.add('item-content');
  itemFooter.style.display = 'block';
  div.innerHTML = `<div class="item-list">
        <div class="item-list-content" >
          <span class="circle circle-icon"></span>
          <p class='active' data-id=${todo.id}>${todo.name}</p>
          <div>
            <span class="close-icon">
              <img src="./images/icon-cross.svg" alt="close" />
            </span>
          </div>
        </div>
      </div>
    </div> `;

  // Add new todo to list container
  listContainer.appendChild(div);
  itemsLength.innerHTML = `${list.length} items left`;

  // Add event listeners for new todo
  const circleIcon = div.querySelector('.circle-icon');
  const active = div.querySelector('.active');
  const closeIcon = div.querySelector('.close-icon');

  // Remove todo
  closeIcon.addEventListener('click', () => {
    list = list.filter((item) => item.id !== todo.id);
    div.remove();
    itemsLength.innerHTML = `${list.length} items left`;
  });

  // Toggle todo completion
  circleIcon.addEventListener('click', () => {
    circleIcon.classList.toggle('clicked');
    let id = active.dataset.id;
    if (id === todo.id) {
      todo.completed = !todo.completed;
    }
  });

  // Show all todos
  allIBtn.addEventListener('click', () => {
    if (!listContainer.contains(div)) {
      listContainer.appendChild(div);
    }
    div.style.display = 'block';
    itemsLength.innerHTML = `${list.length} items left`;
  });

  // Show active todos
  activeBtn.addEventListener('click', (e) => {
    div.style.display = todo.completed ? 'none' : 'block';
    itemsLength.innerHTML = `${list.length} items left`;
  });

  // Show completed todos
  completedBtn.addEventListener('click', () => {
    div.style.display = todo.completed ? 'block' : 'none';
    itemsLength.innerHTML = `${list.length} items left`;
  });

  // Clear all todos
  clearAllBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.item-list');
    if (items.length > 0) {
      items.forEach((item) => {
        listContainer.remove(item);
        itemsLength.innerHTML = `${item.length} items left`;
      });
    }
  });
});

// Theme switcher
theme.addEventListener('click', () => {
  if (darkBg.classList.contains('dark-bg')) {
    darkBg.classList.remove('dark-bg');
    darkBg.classList.add('light-bg');
    document.body.style.backgroundColor = 'white';
    themeIcon.src = './images/icon-moon.svg';
  } else {
    darkBg.classList.remove('light-bg');
    darkBg.classList.add('dark-bg');
    document.body.style.backgroundColor = 'black';
    themeIcon.src = './images/icon-sun.svg';
  }
});
