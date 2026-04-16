import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrencyDropdown(): Promise<Locator> {
    return this.page.locator('a').filter({ hasText: '$ US Dollar' }).first();
  }

  async getCurrencyDropdownMenu(): Promise<Locator> {
    await (await this.getCurrencyDropdown()).hover();
    return this.page.locator('ul.dropdown-menu.currency');
  }

  async euroOption(): Promise<Locator> {
    return this.page.locator('ul.dropdown-menu.currency >> text=€ Euro');
  }

  async poundOption(): Promise<Locator> {
    return this.page.locator(
      'ul.dropdown-menu.currency >> text=£ Pound Sterling'
    );
  }

  async usdOption(): Promise<Locator> {
    return this.page.locator('ul.dropdown-menu.currency >> text=$ US Dollar');
  }

  async getHomeTab(): Promise<Locator> {
    return this.page.getByRole('link', { name: 'Home' });
  }

  async getBooksTab(): Promise<Locator> {
    return this.page.getByRole('link', { name: 'Books' });
  }

  async mouseHoverHome(): Promise<void> {
    await (await this.getHomeTab()).hover();
  }

  async getSpecialFromMainMenu(): Promise<Locator> {
    return this.page
      .locator('#main_menu_top')
      .getByRole('link', { name: 'Special' });
  }

  async getAccountFromMainMenu(): Promise<Locator> {
    return this.page
      .locator('#main_menu_top')
      .getByRole('link', { name: 'Account' });
  }

  async getCartFromMainMenu(): Promise<Locator> {
    return this.page
      .locator('#main_menu_top')
      .getByRole('link', { name: 'Cart' });
  }

  async getCheckoutFromMainMenu(): Promise<Locator> {
    return this.page
      .locator('#main_menu_top')
      .getByRole('link', { name: 'Checkout' });
  }

  async selectSpecialMenu(): Promise<void> {
    await (await this.getSpecialFromMainMenu()).click();
  }

  async getSpecialOffer(): Promise<Locator> {
    return this.page.getByRole('link', { name: 'Special Offers' });
  }

  async selectPreferredProduct(product: string): Promise<void> {
    await this.page.getByTitle(product).click();
  }

  async getOrderedQuantity(): Promise<Locator> {
    return this.page.locator('.input-group #product_quantity');
  }

  async updateQuantity(quantity: string): Promise<void> {
    await this.page.locator('.input-group #product_quantity').fill(quantity);
  }

  async getNewUnitPrice(): Promise<Locator> {
    return this.page.locator('.productfilneprice');
  }

  async getTotalPrice(): Promise<Locator> {
    return this.page.locator('.control-label .total-price');
  }

  async addCurrentOrderToCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'Add to Cart' }).click();
  }

  async getCurrentCartTotal(): Promise<Locator> {
    return this.page
      .getByRole('link', { name: /item/i })
      .locator('span.cart_total');
  }

  async mouseHoverBookTab(): Promise<void> {
    await (await this.getBooksTab()).hover();
  }

  async getAudioCDFromMenu(): Promise<Locator> {
    return this.page.getByRole('link', { name: 'Audio CD' });
  }

  async getPaperbackFromMenu(): Promise<Locator> {
    return this.page.getByRole('link', { name: 'Paperback' });
  }

  async selectAudioCD(): Promise<void> {
    await (await this.getAudioCDFromMenu()).click();
  }

  async selectPaperback(): Promise<void> {
    await (await this.getPaperbackFromMenu()).click();
  }

  async changeToSortingWay(sortBy: string): Promise<void> {
    await this.page.locator('#sort').selectOption({ label: sortBy });
  }

  async selectTheFirstItem(): Promise<void> {
    await this.page.locator('.thumbnails a.prdocutname').first().click();
  }

  async checkOut(): Promise<void> {
    await this.page.locator('#cart_checkout1').click();
  }

  async tickGuestCheckout(): Promise<void> {
    await this.page.getByLabel('Guest Checkout').check();
  }

  async clickContinueButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async fillFirstName(fname: string): Promise<void> {
    await this.page.locator('#guestFrm_firstname').fill(fname);
  }

  async fillLastName(lname: string): Promise<void> {
    await this.page.locator('#guestFrm_lastname').fill(lname);
  }

  async fillEmailAddress(email: string): Promise<void> {
    await this.page.locator('#guestFrm_email').fill(email);
  }

  async fillAddress(address: string): Promise<void> {
    await this.page.locator('#guestFrm_address_1').fill(address);
  }

  async fillCity(city: string): Promise<void> {
    await this.page.locator('#guestFrm_city').fill(city);
  }

  async selectRegion(): Promise<void> {
    await this.page
      .locator('#guestFrm_zone_id')
      .selectOption({ label: 'Anglesey' });
  }

  async inputPostCode(postCode: string): Promise<void> {
    await this.page.locator('#guestFrm_postcode').fill(postCode);
  }

  async selectCountry(): Promise<void> {
    await this.page
      .locator('#guestFrm_country_id')
      .selectOption({ label: 'New Zealand' });
  }

  async confirmOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm Order' }).click();
  }

  async getConfirmationMessage(): Promise<Locator> {
    return this.page.locator('.heading1');
  }

  async waitForProductDetailsDisplay(): Promise<void> {
    await this.page.locator('#product_details').waitFor({ state: 'visible' });
  }

  async waitForAddToCartDisplay(): Promise<void> {
    await this.page.getByText('Add To Cart').waitFor({ state: 'visible' });
  }

  async waitForShoppingCartDisplay(): Promise<void> {
    await this.page.getByText(' Shopping Cart').waitFor({ state: 'visible' });
  }

  async waitForContentPanelDisplay(): Promise<void> {
    await this.page.locator('.contentpanel').waitFor({ state: 'visible' });
  }

  async waitForPaperbackDisplay(): Promise<void> {
    await this.page
      .getByRole('link', { name: 'Paperback' })
      .waitFor({ state: 'visible' });
  }

  async waitForAudioCDDisplay(): Promise<void> {
    await this.page.getByText('AUDIO CD').waitFor({ state: 'visible' });
  }

  async waitForAccountCheckoutDisplay(): Promise<void> {
    await this.page
      .getByText('I am a new customer')
      .waitFor({ state: 'visible' });
  }

  async waitForCheckoutConfirmationDisplay(): Promise<void> {
    await this.page
      .getByText('Checkout Confirmation')
      .waitFor({ state: 'visible', timeout: 5000 });
  }
}
