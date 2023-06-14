const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
  const itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate the Input
  if (newItem === '') {
    // Will add custom alert boxes later
    alert('Please enter an item you would like to add.');
    return;
  }

  // Create item to DOM element
  addItemToDOM(newItem);

  //Add item to local storage
  addItemToStorage(newItem);
  checkUI();
  //console.log(li);
}

function addItemToDOM(item) {
  // create the item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remote-item btn-link text-red');
  li.appendChild(button);
  //Add li to the DOM
  itemList.appendChild(li);
  // clear the value
  itemInput.value = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromLocalStorage();
  // add item to the array
  itemsFromStorage.push(item);
  // add the array back to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromLocalStorage() {
  let itemsFromStorage;
  // check if localStorage already exists for items
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function removeItem(e) {
  // Event delegation to target the specific button
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure you want to remove this item?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function clearItems(e) {
  if (confirm('Are you sure you want to clear your list?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
  checkUI();
}

function filterItems(e) {
  const items = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  //console.log(text);
}

function checkUI() {
  const items = document.querySelectorAll('li');
  //console.log(items);
  if (items.length === 0) {
    itemClear.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    itemClear.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Initialize App
function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItem);
  itemClear.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  // Run these on page load
  checkUI();
}

init();
