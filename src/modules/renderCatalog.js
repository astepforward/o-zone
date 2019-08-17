import filterCards from "./filterCards";

export default function renderCatalog() {
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