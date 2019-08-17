export default function addCart() {
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