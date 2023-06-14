const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate the Input
  if (newItem === '') {
    // Will add custom alert boxes later
    alert('Please enter an item you would like to add.');
    return;
  }

  // create the item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remote-item btn-link text-red');
  li.appendChild(button);
  //Add li to the DOM
  itemList.appendChild(li);
  // clear the value
  itemInput.value = '';
  checkUI();
  //console.log(li);
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

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemClear.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
// Run these on page load
checkUI();
