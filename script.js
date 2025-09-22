// Declare cartList as a main array of listed elements
let cartList = [];
// Declare counter to operate with list ids insted array indexes
let count = 0;
// Some built-in data to testing and generating random items
let randomList = [
  { name: "Apple", price: 1.2 },
  { name: "Banana", price: 0.8 },
  { name: "Orange", price: 1.0 },
  { name: "Pear", price: 1.3 },
  { name: "Grapes", price: 2.5 },
  { name: "Watermelon", price: 4.5 },
  { name: "Strawberries", price: 3.8 },
  { name: "Blueberries", price: 4.2 },
  { name: "Raspberries", price: 4.0 },
  { name: "Mango", price: 2.0 },
  { name: "Pineapple", price: 3.0 },
  { name: "Kiwi", price: 1.1 },
  { name: "Avocado", price: 2.2 },
  { name: "Tomato", price: 1.4 },
  { name: "Cucumber", price: 0.9 },
  { name: "Carrot", price: 0.7 },
  { name: "Potato", price: 0.6 },
  { name: "Onion", price: 0.8 },
  { name: "Garlic", price: 0.5 },
  { name: "Broccoli", price: 2.1 },
  { name: "Cauliflower", price: 2.3 },
  { name: "Spinach", price: 1.5 },
  { name: "Lettuce", price: 1.2 },
  { name: "Cabbage", price: 1.8 },
  { name: "Zucchini", price: 1.3 },
  { name: "Eggplant", price: 1.6 },
  { name: "Bell Pepper", price: 2.0 },
  { name: "Chicken Breast", price: 5.5 },
  { name: "Pork Chops", price: 6.2 },
  { name: "Beef Steak", price: 9.9 },
  { name: "Salmon", price: 12.0 },
  { name: "Tuna Can", price: 2.5 },
  { name: "Shrimp", price: 10.0 },
  { name: "Milk", price: 1.5 },
  { name: "Cheese", price: 3.5 },
  { name: "Yogurt", price: 1.0 },
  { name: "Eggs (dozen)", price: 2.8 },
  { name: "Bread", price: 2.2 },
  { name: "Rice", price: 3.0 },
  { name: "Pasta", price: 2.0 },
  { name: "Oatmeal", price: 2.5 },
  { name: "Flour", price: 1.9 },
  { name: "Sugar", price: 1.6 },
  { name: "Salt", price: 0.7 },
  { name: "Olive Oil", price: 6.5 },
  { name: "Butter", price: 3.0 },
  { name: "Coffee", price: 5.0 },
  { name: "Tea", price: 4.0 },
  { name: "Chocolate", price: 2.5 },
];

// Get all needed elements selectors
const addRandomButton = document.querySelector(".random");
const inputItem = document.getElementById("inputItem");
const inputPrice = document.getElementById("inputPrice");
const addButton = document.getElementById("addItem");

const userCart = document.querySelector(".userCart");
const cartItem = document.querySelector(".cartItem");

const listPanel = document.querySelector(".listPanel");
const clearButton = document.querySelector(".clearList");

const error = document.getElementById("error");

// Main feature of adding item to the list
const addItem = (e) => {
  // Validation of name length with pop-up error message
  if (inputItem.value.length < 2) {
    // Add text value to the error element
    error.textContent = "The name is too short";
    setTimeout(() => {
      // Replace text value to an empty string (clear)
      error.textContent = "";
    }, 1000);
    return;
  }
  // Validation of required price input with pop-up error message
  if (!inputPrice.value) {
    // Add text value to the error element
    error.textContent = "Price can't be empty";
    setTimeout(() => {
      // Replace text value to an empty string (clear)
      error.textContent = "";
    }, 1000);
    return;
  }
  // Validation of negative price
  if (inputPrice.value < 0) {
    // Add text value to the error element
    error.textContent = "Price can't be negative";
    setTimeout(() => {
      // Replace text value to an empty string (clear)
      error.textContent = "";
    }, 1000);
    return;
  }

  // If validation passed store values of input fields in to cartList array of objects
  cartList.push({
    id: count,
    item: inputItem.value,
    price: inputPrice.value,
  });

  // Clear the input field
  inputItem.value = "";
  inputPrice.value = "";

  // Next item will have id + 1
  count += 1;

  // Call updateCart function to render added item
  updateCart();
};

// Love this feature, it allows to test program fast without manual input
const addRandom = (e) => {
  // Prevent fire!
  e.preventDefault();

  // Get random item from randomList
  const randomIndex = Math.floor(Math.random() * randomList.length);
  const randomItem = randomList[randomIndex];

  // Regular behavior of adding
  cartList.push({
    id: count,
    item: randomItem.name,
    price: randomItem.price,
  });

  count += 1;

  updateCart();
};

// Function of deleting
const deleteItem = (e) => {
  // Replace old array with new array with all ids except deleted
  cartList = cartList.filter(({ id }) => e != id); // Hold ids if id not equals e

  // Update total
  updateTotal();
  // Update cart
  updateCart();
};

// Updating Total function
const updateTotal = () => {
  // Declare total storage
  const total = cartList
    // Take all prices inside array and sum it, return sum
    .reduce((sum, { price }) => sum + Number(price), 0)
    // Round it for 2 digits after dot
    .toFixed(2);
  // Add text content to the element
  listPanel.lastElementChild.textContent = "Total: $" + total;
};

// Love it function! Update the cart!
const updateCart = () => {
  // Empty string for each element, prevent rendering broken data
  userCart.textContent = "";
  // Have something in cartList? Let's render it!
  cartList.forEach(({ id, item, price }) => {
    // Clone object structure, not the data!
    const newCartItem = cartItem.cloneNode(true);
    // Every item is a box with 3 childrens
    newCartItem.style.display = "flex";
    // First child - item name value
    newCartItem.firstElementChild.textContent = item;
    // Second child - price value
    newCartItem.firstElementChild.nextElementSibling.textContent = "$" + price;

    // Third child and last - remove button
    const removeButton = newCartItem.lastElementChild;

    // Add eventListener to a button with delete function!
    removeButton.addEventListener("click", () => deleteItem(id));

    // Ready to render our new element!
    userCart.append(newCartItem);

    // Update Total!
    updateTotal();
  });
};

// Clear the list!!
const clearCart = () => {
  // BOM in use!
  if (cartList.length == 0) {
    // Just alert
    alert("Cart is empty. Nothing to clear");
  } else {
    // Have to confirm clearing
    const userResponse = confirm("Are you sure you want to empty cart?");
    if (userResponse) {
      // cartList become empty
      cartList = [];
      // Total set as 0
      total = 0;

      // UPDATE!
      updateCart();
      updateTotal();
    }
  }
};

// Click-click events everywhere!
addRandomButton.addEventListener("click", addRandom);
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearCart);

// Some beautification!
clearButton.addEventListener("mouseover", (e) => {
  e.target.style.backgroundColor = "red";
});
clearButton.addEventListener("mouseleave", (e) => {
  e.target.style.backgroundColor = "";
});

// If our UI is not intuitive (it is very clear IMHO), lets guide the user
inputItem.addEventListener("focus", () => {
  inputItem.setAttribute("placeholder", "Enter product name...");
});
inputPrice.addEventListener("focus", () => {
  inputPrice.setAttribute("placeholder", "Enter price");
});
