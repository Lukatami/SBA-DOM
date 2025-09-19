let cartList = [];
let count = 0;
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

const addRandomButton = document.querySelector(".random");
const inputItem = document.getElementById("inputItem");
const inputPrice = document.getElementById("inputPrice");
const addButton = document.getElementById("addItem");

const userCart = document.querySelector(".userCart");
const cartItem = document.querySelector(".cartItem");

const listPanel = document.querySelector(".listPanel");
const clearButton = document.querySelector(".clearList");

const error = document.getElementById("error");

const addItem = (e) => {
  if (inputItem.value.length < 2) {
    error.textContent = "The name is too short";
    setTimeout(() => {
      error.textContent = "";
    }, 1000);
    return;
  }

  if (!inputPrice.value) {
    error.textContent = "Price can't be empty";
    setTimeout(() => {
      error.textContent = "";
    }, 1000);
    return;
  }

  if (inputPrice.value < 0) {
    error.textContent = "Price can't be negative";
    setTimeout(() => {
      error.textContent = "";
    }, 1000);
    return;
  }

  cartList.push({
    id: count,
    item: inputItem.value,
    price: inputPrice.value,
  });
  inputItem.value = "";
  inputPrice.value = "";
  console.log(cartList);

  count += 1;

  updateCart();
};

const addRandom = (e) => {
  e.preventDefault();

  if (inputItem.value.length < 2) {
  }

  const randomIndex = Math.floor(Math.random() * randomList.length);
  const randomItem = randomList[randomIndex];
  cartList.push({
    id: count,
    item: randomItem.name,
    price: randomItem.price,
  });
  count += 1;

  updateCart();
};

const deleteItem = (e) => {
  cartList = cartList.filter(({ id }) => e != id);
  updateTotal();
  updateCart();
};

const updateTotal = () => {
  const total = cartList
    .reduce((sum, { price }) => sum + Number(price), 0)
    .toFixed(2);
  listPanel.lastElementChild.textContent = "Total: $" + total;
};

const updateCart = () => {
  userCart.textContent = "";
  cartList.forEach(({ id, item, price }) => {
    const newCartItem = cartItem.cloneNode(true);
    newCartItem.style.display = "flex";
    newCartItem.firstElementChild.textContent = item;
    newCartItem.firstElementChild.nextElementSibling.textContent = "$" + price;

    const removeButton = newCartItem.lastElementChild;
    removeButton.addEventListener("click", () => deleteItem(id));

    userCart.append(newCartItem);
    updateTotal();
  });
};

const clearCart = () => {
  if (cartList.length == 0) {
    alert("Cart is empty. Nothing to clear");
  } else {
    const userResponse = confirm("Are you sure you want to empty cart?");
    if (userResponse) {
      cartList = [];
      total = 0;
      updateCart();
      updateTotal();
    }
  }
};

addRandomButton.addEventListener("click", addRandom);
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearCart);

clearButton.addEventListener("mouseover", (e) => {
  e.target.style.backgroundColor = "red";
});
clearButton.addEventListener("mouseleave", (e) => {
  e.target.style.backgroundColor = "";
});
inputItem.addEventListener("focus", () => {
  inputItem.setAttribute("placeholder", "Enter product name...");
});
inputPrice.addEventListener("focus", () => {
  inputPrice.setAttribute("placeholder", "Enter price");
});
