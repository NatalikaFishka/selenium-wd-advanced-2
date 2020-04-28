const Element = require('../base_elements/base_element');

class LogInModal {
  constructor() {
    this.loginForm = new Element('#signInForm');
    this.emailField = new Element('#signInEmail');
    this.passwordField = new Element('#signInPassword');
    this.singInButton = new Element('#signInForm input[type=submit]');
  };

  enterEmail(email) {
    return this.emailField.sendKeys(email);
  };

  enterPassword(password) {
    return this.passwordField.sendKeys(password);
  };

  clickLogin() {
    return this.singInButton.click();
  }
};

module.exports = LogInModal;