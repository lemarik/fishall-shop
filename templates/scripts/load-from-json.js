//jquery?

//на баттон легко добавить атрибут data-art артикул чтобы понимали какая товарка доавблена

let basket;

function checkCart() {
    //наличие в локал корзины 

    if (localStorage.getItem('cart')) basket = JSON.parse(localStorage.getItem('cart'));
}

//надо добавить кнопки плюс и минус и возможно кнопку крестик для удаления
//на кнопку добалять артикул 

/*
async function getResponse() {
    let response = await fetch(url);
    let content = await response.json();

    let list = documetn.querySelectror бла бла 

    здесь добаляем цикл for in или for of и выводим каждый элемент на страницу


    let key;
    for (key in content ){
        list.innerHTML += каждая карточка
    }
}
*/