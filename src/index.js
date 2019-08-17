
import getData from "./modules/getData";                //получение данных с сервера
import renderCards from "./modules/renderCards";        //вывод карточек товара
import toggleCheckbox from "./modules/toggleCheckbox";  //чекбокс
import toggleCart from "./modules/toggleCart";          //корзина
import addCart from "./modules/addCart";                //работа с корзиной
import addFiltering from "./modules/addFiltering";
import renderCatalog from "./modules/renderCatalog";    //работа с каталогом


// >>>фильтрация
// фильтр с учётом акции, цены и названия
// <<<end фильтрация

(async function() {
    const db = await getData();
    renderCards(db);
    toggleCheckbox();
    toggleCart();
    addCart();
    addFiltering();
    renderCatalog();
}());