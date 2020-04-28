const BasePage = require('../base_page/base_page');
const Trainings = require('../base_page/training_list');

class HomePage extends BasePage {
  constructor() {
    super();
    this.Trainings = new Trainings();
  };
  open() {
    return super.open('https://training.by/');
  };
};

module.exports = HomePage;