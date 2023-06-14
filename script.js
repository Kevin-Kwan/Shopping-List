const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let isEditMode = false;
const formBtn = itemForm.querySelector('button');

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

  // check for edit mode
  if (isEditMode) {
    const itemToEdit = document.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    if (checkIfItemExists(newItem)) {
      alert('Item already exists!');
      return;
    }
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('Item already exists!');
      return;
    }
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
  li.appendChild(document.createTextNode(item.toLowerCase()));

  const button = createButton('remove-item btn-link text-red');
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
  itemsFromStorage.push(item.toLowerCase());
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

function onClickItem(e) {
  // Event delegation to target the specific button
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromLocalStorage();
  return itemsFromStorage.includes(item.toLowerCase());
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((item) => {
    item.classList.remove('edit-mode');
  });
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i>  Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm('Are you sure you want to remove this item?')) {
    // Remove item from DOM
    item.remove();
    //Remove item from storage
    removeItemFromStorage(item.textContent.toLowerCase());
    checkUI();
  }
}
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromLocalStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => {
    return i !== item.toLowerCase();
  });
  // Reset to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(e) {
  if (confirm('Are you sure you want to clear your list?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    // Clear from localStorage
    localStorage.removeItem('items');
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
  formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i>  Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

// Initialize App
function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  itemClear.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  // Run these on page load
  checkUI();
}

init();
