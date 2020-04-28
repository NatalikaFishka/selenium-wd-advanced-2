class Element {
  constructor(selector) {
    this.element = element(by.css(selector));
  }
  getElement() {
    return this.element;
  };

  click() {
    return this.element.click();
  };

  getText() {
    return this.element.getText();
  };

  isDisplayed() {
    return this.element.isDisplayed();
  };

  sendKeys(key) {
    return this.element.sendKeys(key);
  };

  async waitToDisplay() {
    await browser.wait(async () => await this.element.isPresent(), 5000);
    return browser.wait(async () => await this.element.isDisplayed(), 5000);
  };

  waitToNotDisplay() {
    return browser.wait(async () => !(await this.element.isPresent()) || !(await this.element.isDisplayed()), 5000);
  }
};

module.exports = Element;