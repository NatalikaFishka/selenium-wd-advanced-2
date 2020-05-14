let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine',
  specs: ['specs/*spec.js'],
  baseUrl: 'localhost',
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      displayFailuresSummary: true,
      displayFailuredSpec: true,
      displaySuiteNumber: true,
      displaySpecDuration: true
    }));
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [
    {
      "browserName": "MicrosoftEdge",
      "ms:edgeOptions": {
        "w3c": false
      }
    },
    {
      "browserName": "chrome",
      "goog:chromeOptions": {
        "w3c": false
      }
    }
  ],
}