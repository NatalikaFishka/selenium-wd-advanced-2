const constants = require('../page_objects/constants/constants');
const PageFactory = require('../page_objects/pageFactory');

describe('Test with "Actions" and "Executer" features on training.by', () => {

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  });

  afterEach(() => {
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript('window.sessionStorage.clear();');
    browser.manage().deleteAllCookies();
  });

  it('Go to training.by then navigate to "DevOps" training page', async () => {
    let trainingCards;
    await browser.get(constants.DEFAULT_TARGET_URL);
    await browser.wait(async () => {
      trainingCards = await browser.executeScript('return document.querySelectorAll(".training-list__desktop .training-item")');
      return trainingCards.length > 0
    }, 5000);
    const trainingCardLinks = await browser.executeScript('return document.querySelectorAll(".training-list__desktop .training-item__title-link")');

    const devOpsCardIndex = await browser.executeScript(`
      const trainingCardTitles = [];
      arguments[0].forEach(curr => trainingCardTitles.push(curr.innerText));
      return trainingCardTitles.indexOf("${constants.CARD_NAME}"); 
    `, trainingCardLinks);

    const devOpsCard = trainingCards[devOpsCardIndex];
    const { y: cardLocationY } = await devOpsCard.getLocation();
    browser.executeScript('window.scrollTo(0,arguments[0]);', cardLocationY - constants.PIXELS);
    const cardsBackColor = await devOpsCard.getCssValue('backgroundColor');
    await browser.executeScript(`arguments[0].style.backgroundColor = "${constants.HIGHLIGHTER_YELLOW}"`, devOpsCard);
    await browser.executeScript(`arguments[0].style.backgroundColor = "${cardsBackColor}"`, devOpsCard);
    const devOpsCardLink = trainingCardLinks[devOpsCardIndex];
    await browser.driver.actions().mouseMove(devOpsCardLink).click().perform();
    const currentURL = await browser.getCurrentUrl();
    expect(currentURL).toEqual(constants.DEVOPS_TRAINING_PAGE);
  });

  fit('Try to login with invalid data and see the error message', async () => {
    await browser.get(constants.DEFAULT_TARGET_URL);
    const logInButton = await browser.executeScript('return document.querySelector(".header-auth__signin")');
    await browser.driver.actions().mouseMove(logInButton).click().perform();
    await browser.wait(async () => await browser.executeScript('return document.querySelector("#signInEmail")'), 6000);

    const emailField = await browser.executeScript('return document.querySelector("#signInEmail")');
    const emailFieldBackColor = await emailField.getCssValue('backgroundColor');
    await browser.executeScript(`arguments[0].style.backgroundColor = "${constants.HIGHLIGHTER_YELLOW}"`, emailField);
    await browser.driver.actions().mouseMove(emailField).click().sendKeys(constants.WRONG_LOGIN).perform();

    const passwordField = await browser.executeScript('return document.querySelector("#signInPassword")');
    const passwordFieldBackColor = await passwordField.getCssValue('backgroundColor');
    await browser.executeScript(`arguments[0].style.backgroundColor = "${constants.HIGHLIGHTER_YELLOW}"`, passwordField);
    await browser.driver.actions().mouseMove(passwordField).click().sendKeys(constants.WRONG_PASSWORD).perform();

    const loginButton = await browser.executeScript('return document.querySelector(".popup-reg-sign-in-form__sign-in")');
    const loginButtonBackColor = await loginButton.getCssValue('backgroundColor');
    await browser.executeScript(`arguments[0].style.backgroundColor = "${constants.HIGHLIGHTER_RED}"`, loginButton);
    await browser.driver.actions().mouseMove(loginButton).click().perform();

    let errorText;
    await browser.wait(async () => {
      errorText = await browser.executeScript(`return document.querySelector("[ng-show='authError']").innerText`);
      return errorText.length > 0
    }, 5000);

    await browser.executeScript(`arguments[0].style.backgroundColor = "${emailFieldBackColor}"`, emailField);
    await browser.executeScript(`arguments[0].style.backgroundColor = "${passwordFieldBackColor}"`, passwordField);
    await browser.executeScript(`arguments[0].style.backgroundColor = "${loginButtonBackColor}"`, loginButton);
    console.log("errorText", errorText)
    expect(errorText).toEqual(constants.AUTH_ERROR_TEXT);
  })
})