const constants = require('../page_objects/constants/constants');
const PageFactory = require('../page_objects/pageFactory');

describe('Test various UX scenarios of training.by', () => {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  });

  afterEach(() => {
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.sessionStorage.clear();');
    browser.driver.manage().deleteAllCookies();
  });

  it('Go to training.by and verify correct page title', async () => {
    await PageFactory.getPage('Home').open();
    const pageTitle = await PageFactory.getPage('Home').getTitle();
    expect(pageTitle).toEqual(constants.EXPECTED_HOME_PAGE_TITLE);
  });

  it('Go to training.by and confirm that default page language is Russian', async () => {
    await PageFactory.getPage('Home').open();
    const currentURL = await PageFactory.getPage('Home').getCurrenUrl();
    expect(currentURL).toEqual(constants.RUSSIAN_HOME_PAGE_URL);
  });

  it('Go to training.by and switch to English language', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Header.languageButton.click();
    await PageFactory.getPage('Home').Header.languageSelectionPanel.clickElementByText(constants.ENGLISH_LANGUAGE_OPTION);
    let isUrlMatch = await PageFactory.getPage('Home').waitForUrl(constants.ENGLISH_HOME_PAGE_URL);
    expect(isUrlMatch).toBeTruthy();
  });

  it('Go to training list and navigate back', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Header.navigationButtons.clickElementByText(constants.TRAINING_LIST_LINK_TEXT_RU);
    let currentURL = await PageFactory.getPage('Home').getCurrenUrl();
    expect(currentURL).toEqual(constants.TRAINING_LIST_LINK_RU);
    await PageFactory.getPage('Home').goBack();
    currentURL = await PageFactory.getPage('Home').getCurrenUrl();
    expect(currentURL).toEqual(constants.DEFAULT_TARGET_URL);
  });

  it('Go to Privacy Policy', async () => {
    await PageFactory.getPage('Home').open();
    const privacyPolicyElement = await PageFactory.getPage('Home').Footer.navigationButtons.getElementByText(constants.PRIVACY_PILICY_LINK_TEXT_RU);
    await PageFactory.getPage('Home').scrollToElement(privacyPolicyElement);
    await PageFactory.getPage('Home').Footer.navigationButtons.clickElementByText(constants.PRIVACY_PILICY_LINK_TEXT_RU);
    let isUrlMatch = await PageFactory.getPage('Home').waitForUrl(constants.PRIVACY_PILICY_LINK);
    expect(isUrlMatch).toBeTruthy();
  });

  it(`Filter trainings by "${constants.FILTER_BY_CITY}" city location`, async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Trainings.waitForTrainings();
    const trainingSection = await PageFactory.getPage('Home').Trainings.trainingSection.getElement()
    await PageFactory.getPage('Home').scrollToElement(trainingSection);

    const filterToggle = await PageFactory.getPage('Home').Trainings.filterToggle.getElement();
    await filterToggle.click();
    await PageFactory.getPage('Home').Trainings.filterSelectionPanel.waitToDisplay();

    await PageFactory.getPage('Home').Trainings.filterCitiesOnPanel.clickElementByText(constants.FILTER_BY_CITY);
    await filterToggle.click();
    await PageFactory.getPage('Home').Trainings.filterSelectionPanel.waitToNotDisplay();

    const citiesOnCards = await PageFactory.getPage('Home').Trainings.trainingCardsLocations.getTexts();
    expect(citiesOnCards.every((curr) => curr.startsWith(constants.FILTER_BY_CITY))).toBeTruthy();
  });

  it('Clear out filter', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').setSessionStorage(constants.FILTER_CITY_KEY, constants.FILTER_BY_CITY_CODE);
    await PageFactory.getPage('Home').Trainings.waitForTrainings();
    const filteredTrainingsCard = await PageFactory.getPage('Home').Trainings.trainingCards.getCount();
    await PageFactory.getPage('Home').Trainings.clearAllFilterButton.click();
    const trainingsCardsAll = await PageFactory.getPage('Home').Trainings.trainingCards.getCount();
    expect(() => trainingsCardsAll > filteredTrainingsCard).toBeTruthy();
  });

  it('Login', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Header.loginButton.click();
    await PageFactory.getPage('Home').LogInModal.loginForm.waitToDisplay();
    await PageFactory.getPage('Home').LogInModal.enterEmail(constants.LOGIN);
    await PageFactory.getPage('Home').LogInModal.enterPassword(constants.PASSWORD);
    await PageFactory.getPage('Home').LogInModal.clickLogin();
    await PageFactory.getPage('Home').Header.loggedInUserName.waitToDisplay();
    const userName = await PageFactory.getPage('Home').Header.loggedInUserName.getText();
    const { value } = await PageFactory.getPage('Home').getCookie(constants.LOGIN_TOKEN_KEY);
    constants.LOGIN_TOKEN_VALUE = value;
    expect(userName).toEqual(constants.USER_NAME);
  });

  it('Log out', async () => {
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').addCookie(constants.LOGIN_TOKEN_KEY, constants.LOGIN_TOKEN_VALUE);
    await PageFactory.getPage('Home').addCookie(constants.LOGIN_STATUS_KEY, constants.LOGIN_STATUS_VALUE);
    await PageFactory.getPage('Home').open();
    await PageFactory.getPage('Home').Header.userInfoArrow.click();
    await PageFactory.getPage('Home').Header.userInfoDropMenu.waitToDisplay();
    await PageFactory.getPage('Home').Header.userInfoDropElements.clickElementByText(constants.LOGOUT_OPTION_TEXT);
    const isLoggedOut = await PageFactory.getPage('Home').Header.loggedInUserName.waitToNotDisplay();
    expect(isLoggedOut).toBeTruthy();
  })
});
