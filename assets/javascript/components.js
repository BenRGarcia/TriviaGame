// Components to be rendered on page

// Contains static (ex.: .header) and dynamic (ex.: ._timer) components to appear on page
const components = {
  header: `<div class="cell"><a href="https://github.com/BenRGarcia/Star-Wars-RPG" target="_blank">View Source Code</a></div><div class="cell"><h1 class="title">Planetary Trivia!</h1></div>`,
  startButton: `<div class="cell"><button class="button large alert start-button js-listen">START</button></div>`,
  _timer: ``,
  _question: ``,
  _choices: ``,
  correct: `<div class="cell content shrink output"><h4>Correct!</h4><img src="./assets/images/dancing-earth.gif"></div>`,
  _incorrect: ``,
  _unanswered: ``,
  _gameOverStats: ``,
  startOverButton: `<div class="cell"><button class="button large alert js-listen">Start Over?</button></div>`,

  get timer() {
    // Model/Template: <div class="cell shrink content output"><h3>Time Remaining: <span id="js-time-remaining">30</span> seconds</h3></div>
    this._timer = `<div class="cell shrink content output"><h3>Time Remaining: <span id="js-time-remaining">`
                  + countDownTimer._timeRemaining
                  + `</span> seconds</h3></div>`;
                  return this._timer;
  },

  get question() {
    // Model/Template: <div class="cell content"><h2>In what month is the Earth closest to the sun?</h2></div>
    this._question = `<div class="cell content"><h2>` + triviaProps.question + `</h2></div>`;
    return this._question;
  },

  get choices() {
    // Model/Template: <div class="cell content shrink output"><h4 class="choices js-listen">January</h4><h4 class="choices js-listen">April</h4><h4 class="choices js-listen">July</h4><h4 class="choices js-listen">October</h4></div>
    let allChoices = "";
    let choicesLength = triviaProps.choices.length;
    for (let i = 0; i < choicesLength; i++) {
      allChoices += `<h4 class="choices js-listen">` + triviaProps.choices[i] + `</h4>`;
    }
    this._choices = `<div id="js-remove" class="cell content shrink output">` + allChoices + `</div>`;
    return this._choices;
  },

  get incorrect() {
    // Model/Template: <div class="cell content shrink output"><h4>NOPE!</h4><h4>The correct answer was:</h4><h4>January</h4><img src="./assets/images/sad-earth.gif"></div>
    this._incorrect = `<div class="cell content shrink output"><h4>NOPE!</h4><h4>The correct answer was:</h4><h4>`
                        + triviaProps.answer
                        + `</h4><img src="./assets/images/sad-earth.gif"></div>`;
                        return this._incorrect;
  },

  get unanswered() {
    // Model/Template: <div class="cell content shrink output"><h4>Out of time!</h4><h4>The correct answer was:</h4><h4>January</h4><img src="./assets/images/sad-earth.gif"></div>
    this._unanswered = `<div class="cell content shrink output"><h4>Out of time!</h4><h4>The correct answer was:</h4><h4>`
                        + triviaProps.answer
                        + `</h4><img src="./assets/images/sad-earth.gif"></div>`;
                        return this._unanswered;
  },

  get gameOverStats() {
    // Model/Template: <div class="cell content shrink output"><h2>All done, here's how you did!</h2><p>Correct Answers: 3</p><p>Incorrect Answers: 4</p><p>Unanswered: 1</p><img src="./assets/images/happy-earth.gif"></div>
    this._gameOverStats = `<div class="cell content shrink output"><h2>All done, here's how you did!</h2><p>Correct Answers: ` + triviaProps.correctCount
                          + `</p><p>Incorrect Answers: ` + triviaProps.incorrectCount
                          + `</p><p>Unanswered: ` + triviaProps.unansweredCount
                          + `</p><img src="./assets/images/happy-earth.gif"></div>`;
                          return this._gameOverStats;
  }
};
