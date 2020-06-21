const allure = require('allure-commandline');
const testMethods = require('../methods/testMethods');
const assert = require('assert');

describe('Prestashop test cases: ', () => {

    it('Test run', () => {

        console.log("Open  main page of the site");
        testMethods.openMainPage();

        console.log("Verify that the price of the goods in section \"Popular goods\" pointed according to selected currency");
        testMethods.selectCurrencyOnSite("USD");
        assert(testMethods.verifyCurrencyOnSite("USD"),
            "The currency type of the item doesn't match the selected USD currency in header");
        testMethods.selectCurrencyOnSite("UAH");
        assert(testMethods.verifyCurrencyOnSite("UAH"),
            "The currency type of the item doesn't match the selected UAH currency in header");
        testMethods.selectCurrencyOnSite("EUR");
        assert(testMethods.verifyCurrencyOnSite("EUR"),
            "The currency type of the item doesn't match the selected EUR currency in header");

        console.log("Select currency UAH");
        testMethods.selectCurrencyOnSite("UAH");

        console.log("Accomplish search in catalogue by word \"dress\"");
        testMethods.searchForSomething("dress");
        testMethods.showSixtyItemsOnPage();

        console.log("Verify that the text about found goods equals the real number of headings of found goods");
        assert.equal(testMethods.getTitleAboutNumberOfFoundItems(),
            testMethods.getNumberOfTitlesOfFoundItems() + " results have been found.");
        console.log("The label " + testMethods.getTitleAboutNumberOfFoundItems() + " is displayed correctly. Verified!");

        console.log("Check that the currency of all goods shown in UAH");
        assert(testMethods.verifyCurrencyOfAllGoods("UAH"),
            "The currency type of the item doesn't match the selected UAH currency in header");

        console.log("Set sorting method \"From high to low\"");
        testMethods.selectSortingMethodFromHighToLow();

        console.log("Check that selected sorting method working correctly");
        assert(testMethods.checkCorrectSortingFromHighToLow(), "Items were sorted not correctly");

        console.log("Verify that items with discount have labels of discount");
        assert(testMethods.checkItemsDiscountPresence(),
            "Some of items don't have discount label, current or regular price.");

        console.log("Check the correct calculation of items with discount");
        testMethods.buyDesiredItem();
        assert(testMethods.checkDiscountCalculation(), "Some items have an incorrect discount calculation");

    });
});

//report generation
const reportGeneration = allure(['generate', 'allure-results', '--clean']);
reportGeneration.on('exit', function(exitCode) {
    console.log('Generation is finished with code:', exitCode);
});