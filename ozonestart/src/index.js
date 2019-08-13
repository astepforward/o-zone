// чекбокс
let navPanelCheckboxes = document.querySelectorAll(".filter-check_checkbox");

navPanelCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            this.nextElementSibling.classList.add("checked");
        }
        else {
            this.nextElementSibling.classList.remove("checked");
        }
    });
});
// end чекбокс

// корзина
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
// end корзина

// работа с товаром
const cards = document.querySelectorAll("#goods .card"),
    cartWrapper = document.querySelector(".cart-wrapper"),
    cartEmpty = document.getElementById("cart-empty"),
    goodsCounter = document.querySelector("#open-cart-button > .counter");

cards.forEach((card) => {
    const btn = card.querySelector(".add-to-cart-button");
    btn.addEventListener("click", () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        updateGoodsCounter();
    });
});

function updateGoodsCounter() {
    const cartCards = cartWrapper.querySelectorAll(".card");
    goodsCounter.textContent = cartCards.length;
}
// end работа с товаром