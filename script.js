const cartList = [];

let count = 0;

const inputItem = document.getElementById("inputItem");
const inputPrice = document.getElementById("inputPrice");
const addButton = document.getElementById("addItem");

const userCart = document.querySelector(".userCart");
const cartItem = document.querySelector(".cartItem");

const removeItem = document.getElementById("removeItem");

console.log(inputItem, inputPrice, addButton, userCart);

const addItem = (e) => {
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

const updateCart = () => {
  userCart.textContent = "";
  cartList.forEach(({ id, item, price }) => {
    const newCartItem = cartItem.cloneNode(true);
    newCartItem.style.display = "flex";
    newCartItem.firstElementChild.textContent = item;
    newCartItem.firstElementChild.nextSibling.textContent = price;

    userCart.append(newCartItem);
  });
};

addButton.addEventListener("click", addItem);
