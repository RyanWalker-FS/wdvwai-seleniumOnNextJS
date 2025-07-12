const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");
const assert = require("assert");

jest.setTimeout(600000); // 10 minutes for all tests

let driver;

beforeAll(async () => {
  driver = new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/");
});

afterAll(async () => {
  if (driver) {
    await driver.quit();
  }
});

describe("Frontend Selenium Tests (single browser session, manual interaction)", () => {
  it('should check the title is "Home" after you navigate there', async () => {
    // Wait up to 5 minutes for the title to become "Home"
    await driver.wait(until.titleIs("Home"), 300000);
    const title = await driver.getTitle();
    assert.strictEqual(title, "Home");
  });

  it('should check the title is "Contact Us" after you navigate there', async () => {
    // You click "Contact Us" in the browser
    await driver.wait(until.titleIs("Contact Us"), 300000);
    const title = await driver.getTitle();
    assert.strictEqual(title, "Contact Us");
  });

  it("should check the message after you submit the form", async () => {
    // You enter the email and submit the form in the browser
    await driver.wait(until.elementLocated(By.id("formMessage")), 300000);
    const message = await driver.findElement(By.id("formMessage"));
    const text = await message.getText();
    // Accept any email
    expect(text).toMatch(/^More info coming to .+@.+\..+$/);
  });
});
