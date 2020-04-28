const Element = require('../base_elements/base_element');
const Collection = require('../base_elements/base_collection');

class Header {
  constructor() {
    this.navigationButtons = new Collection('.main-nav__item');

    this.languageButton = new Element('.location-selector__globe');
    this.languageSelectionPanel = new Collection('div.location-selector__item a');

    this.loginButton = new Element('.header-auth__signin');
    this.loggedInUserName = new Element('.header-controls .user-info__name');
    this.userInfoArrow = new Element('.header-controls .user-info__arrow .arrow');

    this.userInfoDropMenu = new Element('.header-controls .dropdown-menu');
    this.userInfoDropElements = new Collection('.header-controls .dropdown-item a');
  };
};

module.exports = Header;