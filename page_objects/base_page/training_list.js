const Element = require('../base_elements/base_element');
const Collection = require('../base_elements/base_collection');

class Trainings {
  constructor() {
    this.trainingSection = new Element('section.training-list');
    this.filterToggle = new Element('.filter-toggle__arrow-icon');
    this.filterSelectionPanel = new Element('.location__cities:not(.location__skills)');
    this.filterCitiesOnPanel = new Collection('li.cities label');
    this.trainingCardsLocations = new Collection('.training-list__desktop .training-item__location');
    this.clearAllFilterButton = new Element('.filter-field__title .filter-field__input-item-close-icon')
    this.trainingCards = new Collection('.training-list__desktop .training-item')
  };

  waitForTrainings() {
    return browser.wait(async () => await this.trainingCardsLocations.getCount() > 0, 5000);
  };
};

module.exports = Trainings;