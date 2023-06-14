const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate the Input
  if (newItem === '') {
    // Will add custom alert boxes later
    alert('Please enter an item you would like to add.');
    return;
  }

  // add the item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remote-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);
  // clear the value
  itemInput.value = '';
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

// Event Listeners
itemForm.addEventListener('submit', addItem);
