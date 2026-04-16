import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { baseURL } from '../utils/requiredParams';

const baseUrl = baseURL;
let homePage: HomePage;

test.describe('Verify the online shopping functions and features', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto(baseUrl);
    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      page.waitForLoadState('load'),
      page.waitForLoadState('networkidle'),
    ]);
  });

  test('Should be able to get the homepage title correctly', async ({}) => {
    const title = await homePage.getPageTitle();
    expect(title).toEqual(
      'A place to practice your automation testing skills!'
    );
  });

  test('Verify currency dropdown elements and hover behaviour', async ({}) => {
    const currencyDropdown = await homePage.getCurrencyDropdown();
    await expect(currencyDropdown).toBeVisible();
    await expect(currencyDropdown).toContainText('US Dollar');
    const currencyDropdownMenu = await homePage.getCurrencyDropdownMenu();
    await expect(currencyDropdownMenu).toBeVisible();

    await expect(await homePage.euroOption()).toBeVisible();
    await expect(await homePage.poundOption()).toBeVisible();
    await expect(await homePage.usdOption()).toBeVisible();
  });

  test('Verify main menu - Home tab, navigate to special offers and order a product', async ({}) => {
    const quantity = 2;
    const homeTab = await homePage.getHomeTab();
    await expect(homeTab).toBeVisible();

    await homePage.mouseHoverHome();
    await expect(await homePage.getSpecialFromMainMenu()).toBeVisible();
    await expect(await homePage.getAccountFromMainMenu()).toBeVisible();
    await expect(await homePage.getCartFromMainMenu()).toBeVisible();
    await expect(await homePage.getCheckoutFromMainMenu()).toBeVisible();

    await homePage.selectSpecialMenu();
    const specialOffer = await homePage.getSpecialOffer();
    await expect(specialOffer).toBeVisible();

    // select the preferred product
    await homePage.selectPreferredProduct('Creme Precieuse Nuit 50ml');
    await homePage.waitForProductDetailsDisplay();
    const currentQuantity = await homePage.getOrderedQuantity();
    await expect(currentQuantity).toBeEditable();
    await expect(currentQuantity).toBeVisible();
    await expect(currentQuantity).toHaveValue('1');

    const newSinglePriceStr = await (
      await homePage.getNewUnitPrice()
    ).textContent();
    const singlePrice = Number(newSinglePriceStr?.replace(/[^0-9.]/g, ''));
    const totalPrice = singlePrice * quantity;
    const totalPriceStr = `$${totalPrice.toFixed(2)}`; // total price

    // change quantity, will update total price
    await homePage.updateQuantity(quantity.toString());
    await expect(currentQuantity).toHaveValue(quantity.toString());
    const totalPriceNew = await homePage.getTotalPrice();
    await expect(totalPriceNew).toBeVisible();
    await expect(totalPriceNew).toHaveText(totalPriceStr); // check total price is updated following the quantity change

    // add orders to cart
    await homePage.addCurrentOrderToCart();
    await homePage.waitForShoppingCartDisplay();
    const cartTotal = await homePage.getCurrentCartTotal();
    await expect(cartTotal).toBeVisible();
    await expect(cartTotal).toBeVisible();
    await expect(cartTotal).toHaveText(totalPriceStr); // check total price is shown on cart correctly
  });

  test('Verify BOOKS tab, order product, then checkout', async ({}) => {
    const bookTab = await homePage.getBooksTab();
    await expect(bookTab).toBeVisible();
    await homePage.mouseHoverBookTab();
    await expect(await homePage.getAudioCDFromMenu()).toBeVisible();
    await expect(await homePage.getPaperbackFromMenu()).toBeVisible();

    await homePage.selectPaperback();
    await homePage.waitForContentPanelDisplay();
    await homePage.waitForPaperbackDisplay();

    await homePage.changeToSortingWay('Rating Highest');
    await homePage.waitForContentPanelDisplay();
    await homePage.waitForPaperbackDisplay();

    await homePage.selectTheFirstItem(); // select the first item after the sorting
    await homePage.waitForPaperbackDisplay();
    await homePage.waitForProductDetailsDisplay();
    await homePage.waitForAddToCartDisplay();

    await homePage.addCurrentOrderToCart();
    await homePage.waitForShoppingCartDisplay();

    // checkout
    await homePage.checkOut();
    await homePage.waitForAccountCheckoutDisplay();
    await homePage.tickGuestCheckout();
    await homePage.clickContinueButton();
    await homePage.fillFirstName('Adam');
    await homePage.fillLastName('Smith');
    await homePage.fillEmailAddress('adam.smith@email.com');
    await homePage.fillAddress('100 Bond Rd');
    await homePage.fillCity('Wellington');
    await homePage.selectRegion();
    await homePage.inputPostCode('1234');
    await homePage.selectCountry();

    await homePage.clickContinueButton();
    await homePage.waitForCheckoutConfirmationDisplay();
    await homePage.confirmOrder();

    await expect(await homePage.getConfirmationMessage()).toBeVisible();
    await expect(await homePage.getConfirmationMessage()).toHaveText(
      ' Your Order Has Been Processed!'
    );
  });
});
