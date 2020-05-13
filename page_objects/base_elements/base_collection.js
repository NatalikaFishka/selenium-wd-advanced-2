class Collection {
  constructor(selector) {
    this.collection = element.all(by.css(selector));
  };
  getCount() {
    return this.collection.count();
  };

  getTexts() {
    return this.collection.getText();
  };

  async clickElementByText(textToClick) {
    const arrayOfElementTexts = await this.collection.getText();
    const elementToClickIndex = arrayOfElementTexts.indexOf(textToClick);
    if (elementToClickIndex === -1) {
      throw new Error(`No element with [${textToClick}] text found!`);
    }
    return this.collection.get(elementToClickIndex).click();
  };

  async getElementByText(innerText) {
    const arrayOfElementTexts = await this.collection.getText();
    const elementIndex = arrayOfElementTexts.indexOf(innerText);
    if (elementIndex === -1) {
      throw new Error(`No element with [${innerText}] text found!`);
    }
    return this.collection.get(elementIndex);
  };
};

module.exports = Collection;