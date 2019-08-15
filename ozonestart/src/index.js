// чекбокс
function toggleCheckbox() {
    const navPanelCheckboxes = document.querySelectorAll(".filter-check_checkbox");

    navPanelCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                this.nextElementSibling.classList.add("checked");
            } else {
                this.nextElementSibling.classList.remove("checked");
            }
        });
    });
}
// end чекбокс

// корзина
function toggleCart() {
    const openCartBtn = document.getElementById("open-cart-button");
    const modalCartWindow = document.getElementById("order-cart");
    const closeCartBtn = document.getElementById("cart-close-btn");

    openCartBtn.addEventListener("click", () => {
        modalCartWindow.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    closeCartBtn.addEventListener("click", () => {
        modalCartWindow.style.display = "none";
        document.body.style.overflow = "auto";
    });
}
// end корзина

// работа с корзиной
function addCart() {
    const cards = document.querySelectorAll("#goods .card"),
        cartWrapper = document.querySelector(".cart-wrapper"),
        cartEmpty = document.getElementById("cart-empty"),
        goodsCounter = document.querySelector("#open-cart-button > .counter");

    cards.forEach((card) => {
        const btn = card.querySelector(".add-to-cart-button");
        btn.addEventListener("click", () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);

            updateGoodsCounter();

            const removeBtn = cardClone.querySelector(".btn");
            removeBtn.textContent = "Удалить из корзины";
            removeBtn.addEventListener("click", () => {
                cardClone.remove();
                updateGoodsCounter();
            });
        });
    });

    function updateGoodsCounter() {
        const cartCards = cartWrapper.querySelectorAll(".card"),
            cardsPrice = cartWrapper.querySelectorAll(".card-price"),
            cartTotal = document.querySelector(".cart-total > span");

        goodsCounter.textContent = cartCards.length;

        let sum = 0;
        cardsPrice.forEach(cardPrice => {
            sum += parseFloat(cardPrice.textContent);
        });
        cartTotal.textContent = sum;

        if (cartCards.length !== 0) {
            cartEmpty.style.display = "none";
        } else {
            cartEmpty.style.display = "block";
        }
    }
}
// end работа с корзиной

// фильтрация
function addFiltering() {
    const discountCheckbox = document.getElementById("discount-checkbox"),
        min = document.getElementById("min"),
        max = document.getElementById("max"),
        search = document.querySelector(".search-wrapper_input"),
        searchBtn = document.querySelector(".search-btn");

    // добавление фильтра по акции
    discountCheckbox.addEventListener("click", filterCards);

    // добавление фильтра по цене
    min.addEventListener("change", filterCards);
    max.addEventListener("change", filterCards);

    // добавление фильтра по названию (поиска)
    searchBtn.addEventListener("click", filterCards);
    search.addEventListener("keyup", event => {
        event.preventDefault();
        if (event.keyCode === 13) { // Enter
            filterCards();
        }
    });
}

// фильтр с учётом акции, цены и названия
function filterCards() {
    const cards = document.querySelectorAll("#goods .card"),
        discountCheckbox = document.getElementById("discount-checkbox"),
        min = document.getElementById("min"),
        max = document.getElementById("max"),
        search = document.querySelector(".search-wrapper_input");
    const categoryText = sessionStorage.getItem("Category");

    // предикат фильтра по акции
    function filterByDiscount(card) {
        return !discountCheckbox.checked || card.querySelector(".card-sale");
    }

    // предикат фильтра по цене
    function filterByPrice(card) {
        const cardPrice = card.querySelector(".card-price"),
        price = parseFloat(cardPrice.textContent);
        
        // условие с поддержкой пустых значений
        return (!min.value || min.value <= price) &&
               (!max.value || price <= max.value);
    }
    
    // предикат фильтра по названию (поиска)
    function filterByTitle(card) {
        const title = card.querySelector(".card-title");
        return searchText.test(title.textContent);
    }

    function filterByCategory(card) {
        return categoryText === "Default" || card.dataset.category === categoryText;
    }

    // скрываем все товары
    cards.forEach(card => {
        card.parentNode.style.display = "none";
    });

    // отфильтровываем товары, которые подходят по условиям всех фильтров
    const searchText = new RegExp(search.value.trim(), "i");

    const cardsArray = Array.from(cards);
    const filteredCards = cardsArray
        .filter(filterByDiscount)
        .filter(filterByPrice)
        .filter(filterByTitle)
        .filter(filterByCategory);

    // отображаем такие товары
    filteredCards.forEach(card => {
        card.parentNode.style.display = "block";
    });
}
// end фильтрация

// получение данных с сервера
function getData() {
    const goodsWrapper = document.querySelector("#goods");
    return fetch("./db/db.json")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Данные не были получены, ошибка: ${response.status}`);
            }
        })
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = "<div style='color:red; font-size:30px'>Упс, что-то пошло не так</div>";
        });
}

//вывод карточек товара
function renderCards(data) {
    const goodsWrapper = document.querySelector("#goods");
    data.goods.forEach(good => {
        const card = document.createElement("div");
        card.className = "col-12 col-md-6 col-lg-4 col-xl-3";
        card.innerHTML = `
            <div class="card" data-category="${good.category}">
                ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" style="${good.sale ? 'color:purple' : ''}">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary add-to-cart-button">В корзину</button>
                </div>
            </div>
        `;

        goodsWrapper.appendChild(card);
    });
}
// end получение данных с сервера

// работа с каталогом
function renderCatalog() {
    const cards = document.querySelectorAll("#goods .card"),
        catalogList = document.getElementById("catalog-list"),
        catalogWrapper = document.getElementById("catalog-wrapper"),
        catalogBtn = document.getElementById("catalog-button");

    const categories = new Set();
    cards.forEach(card => {
        categories.add(card.dataset.category);
    });

    categories.forEach(category => {
        const catalogItem = document.createElement("li");
        catalogItem.textContent = category;
        catalogList.appendChild(catalogItem);
    });

    catalogBtn.addEventListener("click", event => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = "";
        } else {
            catalogWrapper.style.display = "block";
        }

        if (event.target.tagName === "LI") {
            sessionStorage.setItem("Category", event.target.textContent);
            filterCards();
        }
    });

    sessionStorage.setItem("Category", "Default");
}
// end работа с каталогом

getData().then(data => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    addFiltering();
    renderCatalog();
});

