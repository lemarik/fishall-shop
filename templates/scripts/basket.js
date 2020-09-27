let products;

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

let carts = document.querySelectorAll(".buy-button-card");
getJsonFromFile();

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    console.log(products[i]);
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  console.log(productNumbers);

  if (productNumbers) {
    document.querySelector(
      ".basket-container span"
    ).textContent = productNumbers;
  }
}

function cartNumbers(item) {
  let productNumbers = localStorage.getItem(`cartNumbers`);
  console.log(productNumbers);

  productNumbers = parseInt(productNumbers);
  console.log(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    console.log(productNumbers);
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
  console.log(cartItems);
  cartItems = JSON.parse(cartItems);

  console.log(cartItems);

  if (cartItems != null) {
    if (cartItems[item.id] == undefined) {
      console.log(item.id);
      let a = { ...cartItems };
      console.log(a);
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

  console.log(cartItems);

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
   // (productContainer.innerHTML = ""),
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
                <div class = 'items-table-product'>
                  <div class="product-img"><img class="showcase-img" src="../templates/img/${item.img}"></div>
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
