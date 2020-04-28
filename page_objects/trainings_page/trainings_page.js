const BasePage = require('../base_page/base_page');
const Trainings = require('../base_page/training_list');

class TrainingsPage extends BasePage {
  constructor() {
    super();
    this.Trainings = new Trainings();
  };
  open() {
    return super.open('https://training.by/#!/TrainingList');
  };
};

module.exports = TrainingsPage;