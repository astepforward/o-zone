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
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}
// end работа с корзиной

// фильтр акции
function actionPage() {
    const cards = document.querySelectorAll("#goods .card"),
        discountCheckbox = document.getElementById("discount-checkbox"),
        min = document.getElementById("min"),
        max = document.getElementById("max"),
        search = document.querySelector(".search-wrapper_input"),
        searchBtn = document.querySelector(".search-btn");

    // фильтр по акции        
    discountCheckbox.addEventListener("click", () => {
        cards.forEach(card => {
            if (discountCheckbox.checked) {
                if (!card.querySelector(".card-sale")) {
                    card.parentNode.style.display = "none";
                }
            } else {
                card.parentNode.style.display = "block";
            }
        });
    });

    // фильтр по цене
    function filterPrice() {
        cards.forEach(card => {
            const cardPrice = card.querySelector(".card-price"),
                price = parseFloat(cardPrice.textContent);
                
            if ((!min.value || min.value <= price) &&
                (!max.value || price < max.value)) {
                card.parentNode.style.display = "block";
            } else {
                card.parentNode.style.display = "none";
            }

        });
    }
    
    min.addEventListener("change", filterPrice);
    max.addEventListener("change", filterPrice);

    // поиск
    searchBtn.addEventListener("click", () => {
        const searchText = new RegExp(search.value.trim(), "i");
        cards.forEach(card => {
            const title = card.querySelector(".card-title");
            if (searchText.test(title.textContent)) {
                card.parentNode.style.display = "block";
            } else {
                card.parentNode.style.display = "none";
            }
        });
    });
}
// end фильтр акции

toggleCart();
toggleCheckbox();
addCart();
actionPage();