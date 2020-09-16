document.querySelectorAll('.menu li').forEach ( (item) => {
    item.addEventListener('click', () => {
        loadData(item);
    })
})

function loadData(item) {
    switch(item.id) {
        case 'chilled':
            loadDataUrl(item.id);
        case 'frozen':
            loadDataUrl(item.id);
        case 'hot-smoke':
            loadDataUrl(item.id);
        case 'cold-smoke':
            loadDataUrl(item.id);
        case 'dried':
            loadDataUrl(item.id);
        case 'caviar':
            loadDataUrl(item.id);
        case 'preserv':
            loadDataUrl(item.id);
        case 'salt':
            loadDataUrl(item.id);
        case 'salat':
            loadDataUrl(item.id);
        case 'ready':
            loadDataUrl(item.id);
        case 'seafood':
            loadDataUrl(item.id);
    }   
}

async function loadDataUrl(id) {
    let response = await fetch(`url/${id}`);
    let content = await response.json();

    let list = document.querySelectror();//добавить селектор 


//что делать с селект , масса?

    let key;
    for (key in content ){
        list.innerHTML += `
          <div class="middle-item-card">
            <img class="card-picture" src="img/item-picture-${id}.png">
            <div class="middle-item-card-container">
              <span class="card-picture-name">${content.name}<br></span>
              <span class="is-in-stock">${content.inStock}<br></span>
              <p>${content.price} руб./кг</p>
              <span>${content.weight}<br></span>
              <select name = "blacklist">
                <option value = "2PAC">Tupac Amaru Shakur</option>
                <option value = "50cent">Curtis Jackson</option>
                <option value = "Snoop Dogg" selected>Calvin Cordozar Broadus, Jr.</option>
              </select>
              <br><br>
              <div class="item-card-button-container">
                <button class="info-button-card">
                  <span>Подробнее</span>
                </button>
                <button class="buy-button-card">
                  <span>Купить</span>
                </button>
            </div>
         </div>
    </div>
        `
    }
}