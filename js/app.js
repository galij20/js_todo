import { createItems } from "./items.js";
import { createForm } from "./form.js";

let items = getLocalStorage();
let editId = null;

// Render App
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
  );
  const itemsElement = createItems(items);

  app.appendChild(formElement);
  app.appendChild(itemsElement);
}
render();
// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);

}

// Add Item Function
export function addItem(itemName) {
  const newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };
  items = [...items, newItem];
  setLocalStorage(items);
  render();
}

export function editCompleted(itemId) {
  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  setLocalStorage(items);
  render();
}

// Remove Item Function
export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  setLocalStorage(items);
  render();
}

// Update Item Name Function
export function updateItemName(newName) {
  items = items.map((item) => {
    if (item.id === editId) {
      return { ...item, name: newName };
    }
    return item;
  });
  editId = null;
  setLocalStorage(items);
  render();
}

// Set Edit ID Function
export function setEditId(itemId) {
  editId = itemId;
  render();

  // Focus input after render
  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) {
      input.focus();
    }
  }, 0);
}

function getLocalStorage() {
  const list = localStorage.getItem("todo-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
}


function setLocalStorage(itemsArray) {
  localStorage.setItem("todo-list", JSON.stringify(itemsArray));
}