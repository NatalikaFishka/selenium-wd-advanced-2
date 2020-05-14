const Header = require('./header');
const Footer = require('./footer');
const LogInModal = require('./login_modal');
const EC = protractor.ExpectedConditions;

class BasePage {
  constructor() {
    this.Header = new Header();
    this.Footer = new Footer();
    this.LogInModal = new LogInModal();
  };

  open(url) {
    return browser.get(url);
  };

  getCurrenUrl() {
    return browser.getCurrentUrl();
  };

  getTitle() {
    return browser.getTitle();
  };

  sleep(waitInMilliseconds) {
    return browser.sleep(waitInMilliseconds);
  };

  goBack() {
    return browser.navigate().back();
  };

  waitForUrl(url) {
    return browser.wait(EC.urlIs(url), 5000);
  };

  async scrollToElement(element) {
    const { y } = await element.getLocation();
    return browser.executeScript('window.scrollTo(0,arguments[0]);', y);
  };

  setSessionStorage(key, value) {
    return browser.executeScript(`window.sessionStorage.setItem('${key}', ${value});`);
  };

  addCookie(key, value) {
    return browser.manage().addCookie({ name: key, value: value });
  };

  getCookie(key) {
    return browser.manage().getCookie(key);
  };

  openDevConsole() {
    return browser.actions().sendKeys(protractor.Key.F12).perform();
  }
};

module.exports = BasePage;