// Components to be rendered on page

// Contains static (ex.: .header) and dynamic (ex.: ._timer) components to appear on page
const components = {
  header: `<div class="cell">` +
            `<a href="https://github.com/BenRGarcia/TriviaGame" target="_blank">View Source Code</a>` +
          `</div>` +
          `<div class="cell">` +
            `<h1 class="title">Planetary Trivia!</h1>` +
          `</div>`,

  startButton:  `<div class="cell">` +
                  `<button class="button large alert start-button js-listen">START</button>` +
                `</div>`,

  startOverButton:  `<div class="cell">` +
                      `<button class="button large alert js-listen">Start Over?</button>` +
                    `</div>`,

  correct:  `<div class="cell content shrink output">` +
              `<h4>Correct!</h4><img src="${gifs.correct}">` +
            `</div>`,

  _timer: "",
  _choices: "",
  _question: "",
  _incorrect: "",
  _unanswered: "",
  _gameOverStats: "",
  

  get timer() {
    this._timer = `<div class="cell shrink content output"><h3>Time Remaining: <span id="js-time-remaining">&nbsp;&nbsp;&nbsp;</span> seconds</h3></div>`;
                  return this._timer;
  },

  get question() {
    this._question =  `<div class="cell content">` + 
                        `<h2>${triviaProps.question}</h2>` +
                      `</div>`;
    return this._question;
  },

  get choices() {
    let allChoices = "";
    let choicesLength = triviaProps.choices.length;
    for (let i = 0; i < choicesLength; i++) {
      allChoices += `<h4 class="choices js-listen">${triviaProps.choices[i]}</h4>`;
    }
    this._choices = `<div id="js-remove" class="cell content shrink output">
                      ${allChoices}
                    </div>`;
    return this._choices;
  },

  get incorrect() {
    this._incorrect = `<div class="cell content shrink output"><h4>NOPE!</h4>` +
                        `<h4>The correct answer was:</h4>` +
                        `<h4>${triviaProps.answer}</h4>` +
                        `<img src="${gifs.incorrect}">` +
                      `</div>`;
    return this._incorrect;
  },

  get unanswered() {
    this._unanswered = `<div class="cell content shrink output"><h4>Out of time!</h4><h4>The correct answer was:</h4><h4>`
                        + triviaProps.answer
                        + `</h4><img src="${gifs.incorrect}"></div>`;
    return this._unanswered;
  },

  get gameOverStats() {
    this._gameOverStats = `<div class="cell content shrink output">` +
                            `<h2>All done, here's how you did!</h2>` +
                            `<p>Correct Answers: ${triviaProps.correctCount}</p>` +
                            `<p>Incorrect Answers: ${triviaProps.incorrectCount}</p>` +
                            `<p>Unanswered: ${triviaProps.unansweredCount}</p>` +
                            `<img src="${gifs.gameOver}">` +
                          `</div>`;
    return this._gameOverStats;
  }
};
