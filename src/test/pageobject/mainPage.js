class MainPage {

    get currencySelector() { return $('[action] .current'); } //fixed
    get registerButton() {return $("a[class='login']");} //fixed
    get searchField() {return $("[name='search_query']")}; // search field
    get loginButton() {return $('a[href="/auth"]');}
    get userMenu() {return $('.page-heading');} //fixed
    get homeButton() {return $("[title='Home'] span")} //fixed
    get logoutButton() {return $('ul.dropdown-menu-right li a[href="#"]');}
    get dollarButton() {return $("a[title='Доллар']")};
    get euroButton() {return $("a[title='Евро']")};
    get hryvniaButton() {return $("a[title='Гривна']")};
    get itemPrice() {return $$(".right-block > .content_price > .price.product-price")};
    get itemPricePreview() {return $$("//ul[@id='homefeatured']//div[@class='right-block']" +
        "//span[@class='price product-price']")}
    get numberOfShownItemsOnPage() {return $("select#nb_item")};
    get sixtyItemsOnPage() {return $("[value='60']")};
    get selector() {return ("//form[@id='setCurrency']//strong[.='EUR']")};
    get textFoundItems() {return $(".heading-counter")};
    get foundItemsHeadings() {return $$(".right-block > h5 > .product-name")};
    get selectSortingType() {return $("select#selectProductSort")};
    get sortingTypeFromHighToLow() {return $("[value='price\:desc']")};
    get pageLogo() {return $(".col-xs-8")};
    get labelsOfDiscount() {return $$(".right-block > .content_price > .price-percent-reduction")};
    get productsWithDiscount() {return $$(".discount")};
    get regularPriceOfItem() {return $$(".right-block > .content_price > .old-price.product-price")};
    get currentPriceOfItem() {return $$("//div[@class='right-block']//span[@class='old-price product-price']/following-sibling::span")};
    get dressToCalculateDiscount() {return $(".right-block [title='Printed Chiffon Dress']")};
    get buttonAddToCart() {return $("#add_to_cart span")};
    get buttonPlaceOrder() {return $(".button-container a span")};
    get buttonProceedToCheckout() {return $("[title='Proceed to checkout'] span")}; //only waiter
    get oldPrice() {return $(".old-price")}
    get newPrice() {return $(".price > .price")};
    get discountAmount() {return $(".price-percent-reduction")};


}

module.exports = new MainPage;