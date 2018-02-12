// Components to be rendered on page

// Object that contains static and dynamic components to appear on page
const components = {
  header: '<div class="cell"><a href="https://github.com/BenRGarcia/Star-Wars-RPG" target="_blank">View Source Code</a></div><div class="cell"><h1 class="title">Planetary Trivia!</h1></div>',
  startButton: '<div class="cell"><button class="button large alert start-button js-listen">START</button></div>',
  _timer: '<div class="cell shrink content output"><h3>Time Remaining: <span id="js-time-remaining">30</span> seconds</h3></div>',
  _question: '<div class="cell content"><h2>In what month is the Earth closest to the sun?</h2></div>',
  _choices: '<div class="cell content shrink output"><h4 class="choices js-listen">January</h4><h4 class="choices js-listen">April</h4><h4 class="choices js-listen">July</h4><h4 class="choices js-listen">October</h4></div>',
  _correct: '<div class="cell content shrink output"><h4>Correct!</h4><img src="./assets/images/dancing-earth.gif"></div>',
  _incorrect: '<div class="cell content shrink output"><h4>NOPE!</h4><h4>The correct answer was:</h4><h4>January</h4><img src="./assets/images/sad-earth.gif"></div>',
  _unanswered: '<div class="cell content shrink output"><h4>Out of time!</h4><h4>The correct answer was:</h4><h4>January</h4><img src="./assets/images/sad-earth.gif"></div>',
  _gameOverStats: '<div class="cell content shrink output"><h2>All done, here is how you did!</h2><p>Correct Answers: 3</p><p>Incorrect Answers: 4</p><p>Unanswered: 1</p><img src="./assets/images/happy-earth.gif"></div>',
  startOverButton: '<div class="cell"><button class="button large alert js-listen">Start Over?</button></div>',

  get timer() {
    // <div class="cell shrink content output"><h3>Time Remaining: <span id="js-time-remaining">30</span> seconds</h3></div>
  },

  get question() {
    // <div class="cell content"><h2>In what month is the Earth closest to the sun?</h2></div>
  },

  get choices() {
    // <div class="cell content shrink output"><h4 class="choices js-listen">January</h4><h4 class="choices js-listen">April</h4><h4 class="choices js-listen">July</h4><h4 class="choices js-listen">October</h4></div>
  },

  get correct() {
    // <div class="cell content shrink output"><h4>Correct!</h4><img src="./assets/images/dancing-earth.gif"></div>
  },

  get incorrect() {
    // <div class="cell content shrink output"><h4>NOPE!</h4><h4>The correct answer was:</h4><h4>January</h4><img src="./assets/images/sad-earth.gif"></div>
  },

  get unanswered() {
    // <div class="cell content shrink output"><h4>Out of time!</h4><h4>The correct answer was:</h4><h4>January</h4><img src="./assets/images/sad-earth.gif"></div>
  },

  get gameOverStats() {
    // <div class="cell content shrink output"><h2>All done, here is how you did!</h2><p>Correct Answers: 3</p><p>Incorrect Answers: 4</p><p>Unanswered: 1</p><img src="./assets/images/happy-earth.gif"></div>
  }
};

