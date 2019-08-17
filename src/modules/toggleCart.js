export default function toggleCart() {
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