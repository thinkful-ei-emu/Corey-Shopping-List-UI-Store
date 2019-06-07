/* eslint-disable no-undef */ /* eslint-disable no-console */
'use strict';

const STORE = [
  {id: cuid(), name: 'apples', checked: false},
  {id: cuid(), name: 'oranges', checked: false},
  {id: cuid(), name: 'milk', checked: true},
  {id: cuid(), name: 'bread', checked: false}
];

function generateItemElement(item, itemIndex, template) {
  return `
  <li data-item-id="${item.id}">
  <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
  <div class="shopping-item-controls">

    <button class="shopping-item-toggle js-item-toggle">
        <span class="button-label">check</span>
    </button>

    <button class="shopping-item-delete js-item-delete">
        <span class="button-label">delete</span>
    </button>
  
  </div>
</li>`;
}
  

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  
  const items = shoppingList.map((item) => generateItemElement(item));

  return items.join('');
}

function renderShoppingList() {
  // this will render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName){
  console.log(`Adding '${itemName}' to shopping list`);
  STORE.push({id: cuid(), name: itemName, checked: false});
}

//this will add a new item to the shopping list on click submit
function handleNewItemSubmit() {
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log('Toggling checked property for item with id ' + itemId);
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}
  

//this will check or uncheck item in shopping list with button click
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran'); 
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
  
}
  
//this will delete item from list with button click
function handleDeleteItemClicked() {
  console.log('`handleDeleteItemClicked` ran');
}
 
//this will call all of our functions after the page has loaded
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();

}

$(handleShoppingList);