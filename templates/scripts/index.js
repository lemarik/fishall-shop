let products = [{
    name: 'Sea Urchin',
    tag: 'SeaUrchin',
    price: 50,
    weight: 100,
    inCart: 0
}, {
    name: 'Sea Urchin 2',
    tag: 'SeaUrchin2',
    price: 70,
    weight: 60,
    inCart: 0
}]

let carts = document.querySelectorAll('.middle-item-card');

/*
carts.forEach((item) => {
    item.addEventListener('click', () => {
        cartNumbers(item);
    })
})
*/
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumber) {
        document.querySelectorAll('.basket-container span').textContent = productNumbers;
    }
}

function cartNumbers(item) {
    let productNumbers = localStorage.getItem(`cartNumbers`);

    productNumbers = parseInt(productNumbers);

    productNumber ? (
        localStorage.setItem(`cartNumbers`, productNumbers++),
        document.querySelectorAll('.basket-container span').textContent = productNumbers++
    ) : (
        localStorage.setItem(`cartNumbers`, 1),
        document.querySelectorAll('.basket-container span').textContent = 1
    )

    setItem(item);
}

function setItem(item) {

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[item.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [item.tag]: item
            }
        }
        cartItems[item.tag].inCart += 1
    } else {
        item.inCart = 1;
        cartItems = {
            [item.tag]: item
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(item) {
    let cartCost = localStorage.getItem('totalCost');

    cartCost != null ? (
        cartCost = parseInt(cartCost),
        localStorage.setItem('totalCost', cartCost + item.price)
    ) : localStorage.setItem('totalCost', productPrice);
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.items-table');
    let bigProductContainer = document.querySelector('.container');
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) (
            productContainer.innerHTML = '',
            Object.values(cartItems).map(item => {
                productContainer.innerHTML += `
                <div class = 'items-table-product'>
                  <img src="/${item.tag}">
                  <span>${item.name}</span>
                  <span>${item.weight}</span>
                </div>
                <div class="price"> ${item.price}</div>
                <div class="quantity>
                  <стрелка вниз или влево>
                  <span>${item.inCart}</span>
                  <стрелка вверх или вправо>
                </div>
                <div class="total">
                  ${item.inCart * item.price}₽
                </div>
            `
            })
    )

    let div = document.createElement('div');
    div.className = 'total';
    div.innerHTML = `
      <p>Всего: <span>${cartCost}</span>₽</p>
        <button class="buy-button-basket">
            <span>Оформить заказ</span>
        </button>
    `
    bigProductContainer.append(div);   

}
onLoadCartNumbers()
displayCart();
