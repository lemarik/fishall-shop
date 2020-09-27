let products;
let buyButton = document.querySelectorAll(".buy-button-card");
let moreButton = document.querySelectorAll(".info-button-card");

async function getJsonFromFile() {
  fetch("goods.json")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      response.json().then(function (data) {
        products = data;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

getJsonFromFile();

for (let i = 0; i < moreButton.length; i++) {
  moreButton[i].addEventListener("click", () => {
    openMoreInform(products[i]);
  });
}

for (let i = 0; i < buyButton.length; i++) {
  buyButton[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function openMoreInform(item) {
  let productNumbers = localStorage.getItem(`item`);
  //productNumbers = parseInt(productNumbers);
    localStorage.removeItem("item");
  

  let cartItem = item;
  localStorage.setItem("item", JSON.stringify(cartItem));
  location.href = "pages/item-card.php";
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(
      ".basket-container span"
    ).textContent = productNumbers;
  }
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

//в локалсторадж заносим полную стоимость
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

//отображение корзины
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".items-table");
  let bigProductContainer = document.querySelector(".container");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer)
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
                <div class = 'items-table-product'>
                  <div class="product-img"><img class="showcase-img" src="../templates/img/${
                    item.img
                  }"></div>
                  <div class="product-name">${item.title}</div>
                  <div class="product-weight">${item.weight}</div>
                  <div class="product-price"> ${item.price}</div>
                  <div class="product-quantity> ${item.inCart}</div>
                  <div class="product-total">${item.inCart * item.price}₽</div>
                </div>
            `;
    });

  let div = document.createElement("div");
  div.className = "total";
  div.innerHTML = `
      <p>Всего: <span>${cartCost}</span>₽</p>
        <button class="buy-button-basket">
            <span>Оформить заказ</span>
        </button>
    `;
  bigProductContainer.append(div);
}
onLoadCartNumbers();
displayCart();