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
    const cards = document.querySelectorAll("#goods .card"),
        discountCheckbox = document.getElementById("discount-checkbox"),
        min = document.getElementById("min"),
        max = document.getElementById("max"),
        search = document.querySelector(".search-wrapper_input"),
        searchBtn = document.querySelector(".search-btn");

    // фильтр с учётом акции, цены и названия
    function filterCards() {
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
                   (!max.value || price < max.value);
        }
        
        // предикат фильтра по названию (поиска)
        function filterByTitle(card) {
            const title = card.querySelector(".card-title");
            return searchText.test(title.textContent);
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
            .filter(filterByTitle);

        // отображаем такие товары
        filteredCards.forEach(card => {
            card.parentNode.style.display = "block";
        });
    }

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
// end фильтрация

toggleCart();
toggleCheckbox();
addCart();
addFiltering();