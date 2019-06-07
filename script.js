/* eslint-disable no-undef */ /* eslint-disable no-console */
'use strict';

const STORE = {
  items: [
    {id: cuid(), name: 'apples', checked: false},
    {id: cuid(), name: 'oranges', checked: true},
    {id: cuid(), name: 'ramen', checked: false},
    {id: cuid(), name: 'hot sauce', checked: true},
    {id: cuid(), name: 'milk', checked: false}
  ],
  hideCompleted: false
};

function generateItemElement(item) {
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
  let filteredItems = STORE.items;
  if (STORE.hideCompleted){
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName){
  console.log(`Adding '${itemName}' to shopping list`);
  STORE.items.push({id: cuid(), name: itemName, checked: false}); //may not need id: cuid()
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
  const item = STORE.items.find(item => item.id === itemId);
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
 
function deleteListItem(itemId) {
  console.log(`Deleteing item with id ${itemId} from shopping list`);
  const itemIndex = STORE.items.findIndex(item => item.id === itemId);
  STORE.items.splice(itemIndex, 1);
}

//this will delete item from list with button click
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIdFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}


//*User can press a switch/checkbox to toggle between 
//*displaying all items or displaying only items that are unchecked
function toggleHideFilter() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

function handleToggleHideFilter() {
  $('.js-hide-completed-toggle').on('click', () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

//*User can edit the title of an item
function titleEdit() {

}

function handleTitleEdit() {
  console.log('handleTitleEdit clicked, ran');

}

//User can type in a search term and the displayed list will be 
//filtered by item names only containing that search term
function searchList() {
 
}

function handleSearchList() {
  console.log('handleSearchList clicked, ran');
}


//this will call all of our functions after the page has loaded
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideFilter();
  handleTitleEdit();
  handleSearchList();
}

$(handleShoppingList);