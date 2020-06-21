const mainPage = require('../pageobject/mainPage');
const assert = require('assert');
let priceLength = 6; //the biggest price has 4 digits before comma. That's why we take 4 digits plus 2 after comma.
const currencyEnum = Object.freeze({"USD":"$", "UAH":"₴", "EUR":"€"});

class TestMethods {

    waitUntilURLMatches(urlToCheck){
        browser.waitUntil(function() {
            return browser.getUrl() === urlToCheck;
        }, 10000);
    }

    openMainPage(){
        browser.url('http://prestashop.qatestlab.com.ua/ru/');
        console.log("Main page is opened successfully");
    }

    selectCurrencyOnSite(currency) {

        let desiredCurrency;
        switch (currency) {
            case "USD":
                desiredCurrency = mainPage.dollarButton;
                break;
            case "EUR":
                desiredCurrency = mainPage.euroButton;
                break;
            case "UAH":
                desiredCurrency = mainPage.hryvniaButton;
                break;
            default:
                console.log("The currency that you selected is wrong. Please, select one of the listed " +
                    "currencies: UAH, EUR, USD.");
                return false;
        }
        mainPage.currencySelector.click();
        desiredCurrency.waitForExist(3000);
        desiredCurrency.click();
        mainPage.pageLogo.waitForExist(3000);
        mainPage.pageLogo.waitForDisplayed();
        console.log("Desired currency clicked")
    }

    verifyCurrencyOnSite(currency) {

        let currencySymbol;
        switch (currency) {
            case "USD":
                currencySymbol = currencyEnum.USD;
                break;
            case "EUR":
                currencySymbol = currencyEnum.EUR;
                break;
            case "UAH":
                currencySymbol = currencyEnum.UAH;
                break;
            default:
                console.log("The currency that you want to check is wrong. Please, select one of the listed " +
                    "currencies: UAH, EUR, USD.");
                return false;
        }

        mainPage.pageLogo.waitForExist(3000);
        mainPage.pageLogo.waitForDisplayed();
        let listItemPrices = mainPage.itemPricePreview;
        for(let list of listItemPrices) {
            let text = list.getText();
            if (text.includes(currencySymbol)) {
                console.log("Element with price " + text + " contains symbol " + currencySymbol + "! Verified!");
            } else {
                console.log("Element with price " + text + " doesn't contain the currency symbol. Failed!" );
                return false;
            }
        }
        return true;
    }

    verifyCurrencyOfAllGoods(currency) {

        let currencyOfAllGoods;
        switch (currency) {
            case "USD":
                currencyOfAllGoods = currencyEnum.USD;
                break;
            case "EUR":
                currencyOfAllGoods = currencyEnum.EUR;
                break;
            case "UAH":
                currencyOfAllGoods = currencyEnum.UAH;
                break;
            default:
                console.log("The currency that you want to check is wrong. Please, select one of the listed " +
                    "currencies: UAH, EUR, USD.");
                return false;
        }

        mainPage.searchField.waitForDisplayed();
        let listItemAllPrices = mainPage.itemPrice;
        for(let listAll of listItemAllPrices) {
            let textAll = listAll.getText();
            if (textAll.includes(currencyOfAllGoods)) {
                console.log("Element with price " + textAll + " contains symbol " + currencyOfAllGoods + "!");
            } else {
                console.log("Element with price " + textAll + " doesn't contain the currency symbol. Failed!" );
                return false;
            }
        }
        return true;
    }

    searchForSomething(stringToSearch) {
        mainPage.searchField.waitForDisplayed();
        mainPage.searchField.click();
        mainPage.searchField.addValue(stringToSearch + "\uE007");
        mainPage.searchField.waitForDisplayed();
    }

    showSixtyItemsOnPage() {
        mainPage.numberOfShownItemsOnPage.click();
        mainPage.sixtyItemsOnPage.waitForDisplayed();
        mainPage.sixtyItemsOnPage.click();
        mainPage.searchField.waitForDisplayed();
        console.log("Sixty items on page now shown!")
    }

    getTitleAboutNumberOfFoundItems() {
        mainPage.searchField.waitForDisplayed();
        let textNumberOfFoundItems = mainPage.textFoundItems.getText(); //34 results have been found.
        console.log("Text about found items: " + textNumberOfFoundItems);
        return textNumberOfFoundItems;
    }

    getNumberOfTitlesOfFoundItems() {
        mainPage.searchField.waitForDisplayed();
        let realNumberOfItemsOnPage = mainPage.foundItemsHeadings.length;
        console.log("Number of items which were found on site: " + realNumberOfItemsOnPage);
        return realNumberOfItemsOnPage;
    }

    verifyCorrectNumberOfFoundItems() {
        mainPage.numberOfShownItemsOnPage.click();
        mainPage.sixtyItemsOnPage.waitForDisplayed();
        mainPage.sixtyItemsOnPage.click();

        let textNumberOfFoundItems = mainPage.textFoundItems.getText(); //34 results have been found.
        let realNumberOfItemsOnPage = mainPage.foundItemsHeadings.length;
        assert.equal(textNumberOfFoundItems, realNumberOfItemsOnPage + " results have been found.");
    }

    selectSortingMethodFromHighToLow() {
        mainPage.selectSortingType.click();
        mainPage.sortingTypeFromHighToLow.waitForDisplayed();
        mainPage.sortingTypeFromHighToLow.click();
        this.waitUntilURLMatches("http://prestashop.qatestlab.com.ua/" +
            "ru/search?search_query=dress&submit_search=&n=60&orderby=price&orderway=desc");
        console.log("Desired sorting method was successfully selected!");
    }

    checkCorrectSortingFromHighToLow(){
        let allPrices = mainPage.itemPrice;
        for (let i = 0; i + 1 < allPrices.length; i++) {
            let price = parseFloat(allPrices[i].getText().substring(0, priceLength).replace(",", ".").replace(/\s/g, '')).toFixed(2);
            console.log(price);
            let nextPrice = parseFloat(allPrices[i + 1].getText().substring(0, priceLength).replace(",", ".").replace(/\s/g, '')).toFixed(2);
            console.log(nextPrice);
            if (parseFloat(price) < parseFloat(nextPrice)) {
                console.log("Price " + price + " is lower than " + nextPrice + ". Sorting method failed");
                return false;
            }
            console.log(price + " is more than or equals " + nextPrice + " Verified.");
        }
        return true;
    }

    checkItemsDiscountPresence() {
        let products = mainPage.productsWithDiscount;
        let labels = mainPage.labelsOfDiscount;
        let regularPrice = mainPage.regularPriceOfItem;
        let currentPrice = mainPage.currentPriceOfItem;
        for(let allLabels of labels) {
            if (allLabels.getText().includes("%")) {
                console.log("Label " + allLabels.getText() + " verified");
            } else {
                console.log("Failed. Doesn't have % symbol");
                return false;
            }
        }
        if (products.length == labels.length && regularPrice.length == products.length) {
            console.log("products length " + products.length + " equals to " + labels.length);
            console.log("number of regular prices " + regularPrice.length + " equals to " + products.length);
        } else {
            console.log("Product length " + products.length + " or " + regularPrice.length +
                " doesn't equal to " + labels.length + " or " + products.length + " . Failed");
            return false;
        }
        return true;
    }

    buyDesiredItem() {
        mainPage.dressToCalculateDiscount.click();
        mainPage.buttonAddToCart.waitForDisplayed(5000);
        mainPage.buttonAddToCart.click();
        mainPage.buttonPlaceOrder.waitForDisplayed(5000);
        mainPage.buttonPlaceOrder.click();
        mainPage.buttonProceedToCheckout.waitForDisplayed(5000);
        console.log("Desired item is in stock");
    }

    checkDiscountCalculation() {
        let discountPercentage = parseInt(mainPage.discountAmount.getText().replace("%", ""));
        console.log(discountPercentage);
        let oldPriceOfGood = parseFloat(mainPage.oldPrice.getText().substring(0, priceLength).replace(",", ".")).toFixed(2);
        console.log(oldPriceOfGood);
        let newPriceOfGood = parseFloat(mainPage.newPrice.getText().substring(0, priceLength).replace(",", ".")).toFixed(2);
        console.log(newPriceOfGood);
        let discountAmount = parseFloat(((oldPriceOfGood * (Math.abs(discountPercentage))) / 100)).toFixed(2);
        console.log(discountAmount);
        if ((oldPriceOfGood - discountAmount) == newPriceOfGood) {
            console.log("Old price of good " + oldPriceOfGood + " minus discount amount " + discountAmount
                + " equals to the new price of good " + newPriceOfGood);
        } else {
            console.log("Old price of good " + oldPriceOfGood + " minus discount amount " + discountAmount
                + " doesn't equal to the new price of good " + newPriceOfGood + " . Test failed");
            return false;
        }
        return true;
    }

}

module.exports = new TestMethods();