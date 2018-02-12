// CONTROLLER - accepts input and converts it to commands for the model or view

// Takes player clicks and translates into game logic
const triviaGame = {
  _questionsLeft: 0,
  _questionIsActive: false,
  _questionTimeLimit: 15,
  _transitionTimeLimit: 5,
  
  clickHandler(clickValue) {
    if (clickValue === "START" || clickValue === "Start Over?") {
      this.start();
    } else if (triviaProps.choices.indexOf(clickValue) !== -1) {
      this.evaluate(clickValue);
    }
  },

  nextQuestion() {
    if (this._questionsLeft > 0) {
      this._questionIsActive = true;
      this._questionsLeft--;
      triviaProps.questionObj = triviaQuestions._questionObj[this._questionsLeft]
      DOM.render("question");
      this.setTimer(this._questionTimeLimit);
    } else {
      this.gameIsOver();
    }
  },

  evaluate(choice) {
    this.stopTimer();
    this._questionIsActive = false;
    if (choice === triviaProps.answer) {
      this.guessWasRight();
    } else {
      this.guessWasWrong();
    }
  },

  guessWasRight() {
    triviaProps.incrementCorrect();
    DOM.render("rightAnswer");
    this.setTimer(this._transitionTimeLimit);
  },

  guessWasWrong() {
    triviaProps.incrementIncorrect();
    DOM.render("wrongAnswer");
    this.setTimer(this._transitionTimeLimit);
  },

  questionWasUnanswered() {
    this._questionIsActive = false;
    triviaProps.incrementUnanswered();
    DOM.render("unanswered");
    this.setTimer(this._transitionTimeLimit);
  },

  setTimer(seconds) {
    countDownTimer.setTimeRemaining = seconds;
  },

  stopTimer() {
    countDownTimer.reset();
  },

  receiveTimerData(secondsRemaining) {
    if (triviaGame._questionIsActive) {
      DOM.render("timeRemaining");
    }
    if (secondsRemaining <= 0) {
      if (this._questionIsActive) {
        this.questionWasUnanswered();
      } else {
        this.nextQuestion();
      }
    }
  },

  gameIsOver() {
    DOM.render("gameOver");
  },

  start() {
    triviaProps.resetGame();
    this._questionsLeft = triviaQuestions._questionObj.length;
    this.nextQuestion();
  },

  initialize() {
    countDownTimer.addSubscriber = triviaGame;
    DOM.render("initialize");
  }
};

// Click event listener
$(function() {
  $('#js-page-content').on('click', ".js-listen", e => {
      let clickValue = e.target.innerText;
      triviaGame.clickHandler(clickValue);
  });
});

// Initialize game
triviaGame.initialize();
