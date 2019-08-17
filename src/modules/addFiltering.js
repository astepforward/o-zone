import filterCards from "./filterCards";

export default function addFiltering() {
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