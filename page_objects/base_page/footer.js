const Collection = require('../base_elements/base_collection');

class Footer {
  constructor() {
    this.navigationButtons = new Collection('.footer-nav__item');
  }
}

module.exports = Footer;