function displayItem() {
  let cartItem = localStorage.getItem("item");
  let productContainer = document.querySelector(".card-container");

  cartItem = JSON.parse(cartItem);

  if (cartItem && productContainer) {
    productContainer.innerHTML = "";
    productContainer.innerHTML += ` 
    <h2>${cartItem.title}</h2>
    <img class="item-picture" name="item-picture" src="../templates/img/${cartItem.img}">
    <form>
        <div class="to-buy-container">
            <div class="cost-weight">
                <div class="weight">
                    <span>Масса</span>
                    <br>
                    <span>${cartItem.weight}</span>
                </div>
                <div class="cost">
                    <span>Цена</span>
                    <br>
                    <span>${cartItem.price}руб.</span>
                </div>
            </div>
           <button class="buy-button">
                <span>Купить</span>
            </button>
        </div>
    </form>
    <div class="item-info">
        <p>${cartItem.catch}<br>
        ${cartItem.freezing}<br>
        ${cartItem.storage}<br>
        ${cartItem.release}<br>
        ${cartItem.quantity}<br>
        ${cartItem.calories}</p>
    </div>`;
  }
}

function addToCart() {
  let buyButton = document.querySelector(".buy-button");
  let cartItem = localStorage.getItem("item");

  cartItem = JSON.parse(cartItem);

  console.log(cartItem);
  console.log(buyButton);

  buyButton.addEventListener("click", () => {
    console.log(cartItem);
    cartNumbers(cartItem);
    totalCost(cartItem);
  });
}
function totalCost(item) {
  let cartCost = localStorage.getItem("totalCost");

  cartCost != null
    ? ((cartCost = parseInt(cartCost)),
      localStorage.setItem(
        "totalCost",
        parseInt(cartCost) + parseInt(item.price)
      ))
    : localStorage.setItem("totalCost", parseInt(item.price));
}

function cartNumbers(item) {
  let productNumbers = localStorage.getItem(`cartNumbers`);
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".basket-container span").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem(`cartNumbers`, 1);
    document.querySelector(".basket-container span").textContent = 1;
  }

  setItem(item);
}

function setItem(item) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[item.id] == undefined) {
      cartItems = {
        ...cartItems,
        [item.id]: item,
      };
    }
    cartItems[item.id].inCart = parseInt(cartItems[item.id].inCart) + 1;
  } else {
    item.inCart = 1;
    cartItems = {
      [item.id]: item,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function checkCart() {
  if (localStorage.getItem("cartNumbers")) {
    document.querySelector(".basket-container span").textContent = JSON.parse(
      localStorage.getItem("cartNumbers")
    );
  }
}
checkCart();
displayItem();
addToCart();
