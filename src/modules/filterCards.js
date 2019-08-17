//фильтр с учётом акции, цены и названия
export default function filterCards() {
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