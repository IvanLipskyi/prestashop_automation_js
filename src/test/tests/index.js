const allure = require('allure-commandline');
const searchPageMethods = require('../methods/searchPageMethods');
const mainPageMethods = require('../methods/mainPageMethods');
const assert = require('assert');

describe('Prestashop test cases: ', () => {

    it('Test run', () => {

        console.log("Open  main page of the site");
        mainPageMethods.openMainPage();

        console.log("Verify that the price of the goods in section \"Popular goods\" pointed according to selected currency");
        mainPageMethods.selectCurrencyOnSite("USD");
        assert(mainPageMethods.verifyCurrencyOnSite("USD"),
            "The currency type of the item doesn't match the selected USD currency in header");
        mainPageMethods.selectCurrencyOnSite("UAH");
        assert(mainPageMethods.verifyCurrencyOnSite("UAH"),
            "The currency type of the item doesn't match the selected UAH currency in header");
        mainPageMethods.selectCurrencyOnSite("EUR");
        assert(mainPageMethods.verifyCurrencyOnSite("EUR"),
            "The currency type of the item doesn't match the selected EUR currency in header");

        console.log("Select currency UAH");
        mainPageMethods.selectCurrencyOnSite("UAH");

        console.log("Accomplish search in catalogue by word \"dress\"");
        mainPageMethods.searchForSomething("dress");

        console.log("Switch a number of shown items to 60 to see a full list of found items");
        searchPageMethods.showSixtyItemsOnPage();

        console.log("Verify that the text about found goods equals the real number of headings of found goods");
        assert.equal(searchPageMethods.getTitleAboutNumberOfFoundItems(),
            searchPageMethods.getNumberOfTitlesOfFoundItems() + " results have been found.");
        console.log("The label " + searchPageMethods.getTitleAboutNumberOfFoundItems() + " is displayed correctly. Verified!");

        console.log("Check that the currency of all goods shown in UAH");
        assert(searchPageMethods.verifyCurrencyOfAllGoods("UAH"),
            "The currency type of the item doesn't match the selected UAH currency in header");

        console.log("Set sorting method \"From high to low\"");
        searchPageMethods.selectSortingMethodFromHighToLow();

        console.log("Check that selected sorting method working correctly");
        assert(searchPageMethods.checkCorrectSortingFromHighToLow(), "Items were sorted not correctly");

        console.log("Verify that items with discount have labels of discount");
        assert(searchPageMethods.checkItemsDiscountPresence(),
            "Some of items don't have discount label, current or regular price.");

        console.log("Check the correct calculation of items with discount");
        searchPageMethods.buyDesiredItem();
        assert(searchPageMethods.checkDiscountCalculation(), "Some items have an incorrect discount calculation");

    });
});

//report generation
const reportGeneration = allure(['generate', 'allure-results', '--clean']);
reportGeneration.on('exit', function(exitCode) {
    console.log('Generation is finished with code:', exitCode);
});