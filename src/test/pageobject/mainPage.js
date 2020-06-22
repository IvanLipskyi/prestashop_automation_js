class MainPage {

    get currencySelector() { return $('[action] .current'); }
    get searchField() {return $("[name='search_query']")};
    get dollarButton() {return $("a[title='Доллар']")};
    get euroButton() {return $("a[title='Евро']")};
    get hryvniaButton() {return $("a[title='Гривна']")};
    get itemPricePreview() {return $$("//ul[@id='homefeatured']//div[@class='right-block']" +
        "//span[@class='price product-price']")}
    get pageLogo() {return $(".col-xs-8")};

}

module.exports = new MainPage;