export default function toggleCheckbox() {
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