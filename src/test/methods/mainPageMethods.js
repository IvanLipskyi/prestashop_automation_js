const mainPage = require('../pageobject/mainPage');
const assert = require('assert');
let priceLength = 6; //the biggest price has 4 digits before comma. That's why we take 4 digits plus 2 after comma.
const currencyEnum = Object.freeze({"USD":"$", "UAH":"₴", "EUR":"€"});

class MainPageMethods {

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

    searchForSomething(stringToSearch) {
        mainPage.searchField.waitForDisplayed();
        mainPage.searchField.click();
        mainPage.searchField.addValue(stringToSearch + "\uE007");
        mainPage.searchField.waitForDisplayed();
    }

}

module.exports = new MainPageMethods();