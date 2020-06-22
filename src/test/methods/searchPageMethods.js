const searchPage = require('../pageobject/searchPage');
const mainPage = require('../pageobject/mainPage');
const assert = require('assert');
let priceLength2 = 6; //the biggest price has 4 digits before comma. That's why we take 4 digits plus 2 after comma.
const currencyEnum2 = Object.freeze({"USD":"$", "UAH":"₴", "EUR":"€"});

class SearchPageMethods {


    verifyCurrencyOfAllGoods(currency) {
        let currencyOfAllGoods;
        switch (currency) {
            case "USD":
                currencyOfAllGoods = currencyEnum2.USD;
                break;
            case "EUR":
                currencyOfAllGoods = currencyEnum2.EUR;
                break;
            case "UAH":
                currencyOfAllGoods = currencyEnum2.UAH;
                break;
            default:
                console.log("The currency that you want to check is wrong. Please, select one of the listed " +
                    "currencies: UAH, EUR, USD.");
                return false;
        }

        mainPage.searchField.waitForDisplayed();
        let listItemAllPrices = searchPage.itemPrice;
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

    showSixtyItemsOnPage() {
        searchPage.numberOfShownItemsOnPage.click();
        searchPage.sixtyItemsOnPage.waitForDisplayed();
        searchPage.sixtyItemsOnPage.click();
        mainPage.searchField.waitForDisplayed();
        console.log("Sixty items on page now shown!")
    }

    getTitleAboutNumberOfFoundItems() {
        mainPage.searchField.waitForDisplayed();
        let textNumberOfFoundItems = searchPage.textFoundItems.getText(); //34 results have been found.
        console.log("Text about found items: " + textNumberOfFoundItems);
        return textNumberOfFoundItems;
    }

    getNumberOfTitlesOfFoundItems() {
        mainPage.searchField.waitForDisplayed();
        let realNumberOfItemsOnPage = searchPage.foundItemsHeadings.length;
        console.log("Number of items which were found on site: " + realNumberOfItemsOnPage);
        return realNumberOfItemsOnPage;
    }

    verifyCorrectNumberOfFoundItems() {
        searchPage.numberOfShownItemsOnPage.click();
        searchPage.sixtyItemsOnPage.waitForDisplayed();
        searchPage.sixtyItemsOnPage.click();

        let textNumberOfFoundItems = searchPage.textFoundItems.getText(); //34 results have been found.
        let realNumberOfItemsOnPage = searchPage.foundItemsHeadings.length;
        assert.equal(textNumberOfFoundItems, realNumberOfItemsOnPage + " results have been found.");
    }

    selectSortingMethodFromHighToLow() {
        searchPage.selectSortingType.click();
        searchPage.sortingTypeFromHighToLow.waitForDisplayed();
        searchPage.sortingTypeFromHighToLow.click();
        this.waitUntilURLMatches("http://prestashop.qatestlab.com.ua/" +
            "ru/search?search_query=dress&submit_search=&n=60&orderby=price&orderway=desc");
        console.log("Desired sorting method was successfully selected!");
    }

    checkCorrectSortingFromHighToLow(){
        let allPrices = searchPage.itemPrice;
        for (let i = 0; i + 1 < allPrices.length; i++) {
            let price = parseFloat(allPrices[i].getText().substring(0, priceLength2).replace(",", ".").replace(/\s/g, '')).toFixed(2);
            console.log(price);
            let nextPrice = parseFloat(allPrices[i + 1].getText().substring(0, priceLength2).replace(",", ".").replace(/\s/g, '')).toFixed(2);
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
        let products = searchPage.productsWithDiscount;
        let labels = searchPage.labelsOfDiscount;
        let regularPrice = searchPage.regularPriceOfItem;
        let currentPrice = searchPage.currentPriceOfItem;
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
        searchPage.dressToCalculateDiscount.click();
        searchPage.buttonAddToCart.waitForDisplayed(5000);
        searchPage.buttonAddToCart.click();
        searchPage.buttonPlaceOrder.waitForDisplayed(5000);
        searchPage.buttonPlaceOrder.click();
        searchPage.buttonProceedToCheckout.waitForDisplayed(5000);
        console.log("Desired item is in stock");
    }

    checkDiscountCalculation() {
        let discountPercentage = parseInt(searchPage.discountAmount.getText().replace("%", ""));
        console.log(discountPercentage);
        let oldPriceOfGood = parseFloat(searchPage.oldPrice.getText().substring(0, priceLength2).replace(",", ".")).toFixed(2);
        console.log(oldPriceOfGood);
        let newPriceOfGood = parseFloat(searchPage.newPrice.getText().substring(0, priceLength2).replace(",", ".")).toFixed(2);
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

    waitUntilURLMatches(urlToCheck){
        browser.waitUntil(function() {
            return browser.getUrl() === urlToCheck;
        }, 10000);
    }

}

module.exports = new SearchPageMethods();