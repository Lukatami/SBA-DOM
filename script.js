let cartList = [];
let sum = 0;
let count = 0;

const inputItem = document.getElementById("inputItem");
const inputPrice = document.getElementById("inputPrice");
const addButton = document.getElementById("addItem");

const userCart = document.querySelector(".userCart");
const cartItem = document.querySelector(".cartItem");

const listPanel = document.querySelector(".listPanel");

console.log(inputItem, inputPrice, addButton, userCart);

const addItem = (e) => {
  cartList.push({
    id: count,
    item: inputItem.value,
    price: inputPrice.value,
  });
  sum += parseInt(inputPrice.value)
  console.log(sum)
  inputItem.value = "";
  inputPrice.value = "";
  console.log(cartList);

  count += 1;

  

  updateCart();
};

const deleteItem = (elementId) => {
  cartList = cartList.filter(({ id }) => elementId != id);
  updateCart();
};

const updateCart = () => {
  userCart.textContent = "";
  cartList.forEach(({ id, item, price }) => {
    const newCartItem = cartItem.cloneNode(true);
    newCartItem.style.display = "flex";
    newCartItem.firstElementChild.textContent = item;
    newCartItem.firstElementChild.nextElementSibling.textContent = "$" + price;

    const removeButton = newCartItem.lastElementChild;

    listPanel.lastElementChild.textContent = "Total: $" + sum;

    removeButton.addEventListener("click", () => deleteItem(id));

    userCart.append(newCartItem);
  });
};

addButton.addEventListener("click", addItem);
