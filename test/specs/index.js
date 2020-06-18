const allure = require('allure-commandline');
const testMethods = require('../pageobject/testMethods');

describe('Presta shop test cases: ', () => {

    it('Check everything', () => {

        testMethods.openMainPage();
        testMethods.signIn();
        testMethods.checkCurrencyUAH();
        testMethods.checkCurrencyEUR();
        testMethods.checkCurrencyUSD();
        testMethods.putCurrencyUAH();
        testMethods.searchForSomething("dress");
        testMethods.verifyCorrectNumberOfFoundItems();
        testMethods.selectSortingMethodFromHighToLow();
        testMethods.checkCorrectSortingFromHighToLow();
        testMethods.checkItemsDiscountPresence();
        testMethods.checkDiscountCalculation();

    });
});

//report genereation
const reportGeneration = allure(['generate', 'allure-results', '--clean']);
reportGeneration.on('exit', function(exitCode) {
    console.log('Generation is finished with code:', exitCode);
});