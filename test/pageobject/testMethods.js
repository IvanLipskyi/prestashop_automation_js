const mainPage = require('../pageobject/mainPage');
const loginPage = require('../pageobject/loginPage');
const assert = require('assert');
let priceLength = 5; //the biggest price has 3 digits before comma. That's why we take 5 digits

class TestMethods {

    waitUntilURLMatches(urlToCheck){
        browser.waitUntil(function() {
            return browser.getUrl() === urlToCheck;
        }, 10000);
    }

    openMainPage(){
        browser.url('http://prestashop.qatestlab.com.ua/ru/');
    }

    signIn() {
        mainPage.searchField.waitForExist(3000);
        mainPage.registerButton.click();
        let emailAdress = "sinebot1999999@gmail.com";
        let password = "autotest";
// After reopening registration page email field should be empty
        assert.equal(loginPage.emailField.getValue(), false);
        console.log("email field is empty");
        assert.equal(loginPage.passwordField.getValue(), false);
        console.log("password field is empty");
//Fields types check
        assert.equal(loginPage.emailField.isExisting(), true);
        console.log("email field exists");
        assert.equal(loginPage.passwordField.isExisting(), true);
        console.log("password field exists");
//Check that user can successfully login
        loginPage.emailField.addValue(emailAdress);
        loginPage.passwordField.addValue(password);
        loginPage.submitButton.click();
        mainPage.userMenu.waitForExist(3000);
    }

    checkCurrencyUAH() {
        mainPage.homeButton.click();
        mainPage.searchField.waitForExist(3000);
        mainPage.currencySelector.click();
        mainPage.hryvniaButton.waitForExist(3000);
        mainPage.hryvniaButton.click();
        mainPage.pageLogo.waitForExist(3000);
        mainPage.pageLogo.waitForDisplayed();
        let listPricesUAH = mainPage.itemPrice;
        for(let listUAH of listPricesUAH) {
            let textUAH = listUAH.getText();
            if (textUAH.includes("₴")) {
                console.log("Element with price " + listUAH + " contains symbol ₴!");
            }
        }
    }

    checkCurrencyEUR() {
        mainPage.currencySelector.click();
        mainPage.euroButton.waitForExist(3000);
        mainPage.euroButton.click();
        mainPage.pageLogo.waitForExist(3000);
        mainPage.pageLogo.waitForDisplayed();
        let listPricesEUR = mainPage.itemPrice;
        for(let listEUR of listPricesEUR) {
            let text = listEUR.getText();
            if (text.includes("€")) {
                console.log("Element with price " + text + " contains symbol €!");
            }
        }
    }

    checkCurrencyUSD() {
        mainPage.currencySelector.click();
        mainPage.dollarButton.waitForExist(3000);
        mainPage.dollarButton.click();
        mainPage.pageLogo.waitForExist(3000);
        mainPage.pageLogo.waitForDisplayed();
        let listPricesUSD = mainPage.itemPrice;
        for(let listUSD of listPricesUSD) {
            let textUSD = listUSD.getText();
            if (textUSD.includes("$")) {
                console.log("Element with price " + textUSD + " contains symbol $!");
            }
        }
    }

    putCurrencyUAH() {
        mainPage.currencySelector.click();
        mainPage.hryvniaButton.waitForExist(3000);
        mainPage.hryvniaButton.click();
    }

    searchForSomething(stringToSearch) {
        mainPage.searchField.waitForDisplayed();
        mainPage.searchField.click();
        mainPage.searchField.addValue(stringToSearch + "\uE007");
        mainPage.searchField.waitForDisplayed();
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
    }

    checkCorrectSortingFromHighToLow(){
        let allPrices = mainPage.itemPrice;
        for (let i = 0; i + 1 < allPrices.length; i++) {
            let price = parseFloat(allPrices[i].getText().substring(0, priceLength).replace(",", ".")).toFixed(2);
            console.log(price);
            let nextPrice = parseFloat(allPrices[i + 1].getText().substring(0, priceLength).replace(",", ".")).toFixed(2);
            console.log(nextPrice);
            if (parseFloat(price) < parseFloat(nextPrice)) {
                console.log("Price " + price + " is lower than " + nextPrice + ". Sorting method failed");
            }
            console.log(price + " is more than or equals " + nextPrice + " Verified.");
        }
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
                console.log("Failed. Doesn't have % symbol")
            }
        }
        if (products.length == labels.length && regularPrice.length == products.length) {
            console.log("products length " + products.length + " equals to " + labels.length);
            console.log("number of regular prices " + regularPrice.length + " equals to " + products.length);
        } else {
            console.log("Failed")
        }
    }

    checkDiscountCalculation() {
        mainPage.dressToCalculateDiscount.click();
        mainPage.buttonAddToCart.waitForDisplayed(5000);
        mainPage.buttonAddToCart.click();
        mainPage.buttonPlaceOrder.waitForDisplayed(5000);
        mainPage.buttonPlaceOrder.click();
        mainPage.buttonProceedToCheckout.waitForDisplayed(5000);
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
            console.log("False");
        }
    }

}

module.exports = new TestMethods();