// CONTROLLER - accepts input and converts it to commands for the model or view

// Controller object, takes player clicks and translates into game logic
const triviaGame = {
  _questionsLeft: 0,
  _questionIsActive: false,
  _questionTimeLimit: 6,
  _transitionTimeLimit: 3,
  
  // Receives all click event values
  clickHandler(clickValue) {
    if (clickValue === "START" || clickValue === "START OVER?") {
      // Player clicked START/START OVER, need to start game
      this.start();
    } else {
      // Player selected an answer choice
      this.evaluate(clickValue);
    }
  },

  // Sets trivia question, renders to screen -- will detect if game is over
  nextQuestion() {
    // Only set next question if more questions remain in question bank
    if (this._questionsLeft > 0) {
      this._questionIsActive = true;
      this._questionsLeft--;
      triviaProps.questionObj = triviaQuestions._questionObj[this._questionsLeft - 1]
      DOM.render("question");
      this.setTimer(this._questionTimeLimit);
    } else { // No more questions remain, game is over
      this.gameIsOver();
    }
  },

  // Will evaluate if player's choice was right or wrong
  evaluate(choice) {
    this.stopTimer();
    this._questionIsActive = false;
    if (choice === triviaProps.answer) {
      // User guess was right
      this.guessWasRight();
    } else {
      // User guess was wrong
      this.guessWasWrong();
    }
  },

  // For when the player choice was right
  guessWasRight() {
    triviaProps.incrementCorrect();
    DOM.render("correctAnswer");
    setTimer(this._transitionTimeLimit);
  },

  // For when the player choice was wrong
  guessWasWrong() {
    triviaProps.incrementIncorrect();
    DOM.render("incorrectAnswer");
    setTimer(this._transitionTimeLimit);
  },

  // For when the player did not choose an answer within the alloted time
  questionWasUnanswered() {
    this._questionIsActive = false;
    triviaProps.incrementUnanswered();
    DOM.render("unanswered");
    setTimer(this._transitionTimeLimit);
  },

  // Set countDownTimer's initial count down amount
  setTimer(seconds) {
    countDownTimer.setTimeRemaining = seconds;
    console.log(`triviaGame.setTimer just called countDownTimer.setTimeRemaining for ${seconds} seconds.`);
  },

  // Will stop the countDownTimer
  stopTimer() {
    console.log(`triviaGame.stopTimer() was just called, telling countDownTimer to STOP!`);
    countDownTimer.reset();
  },

  receiveTimerData(secondsRemaining) {
    console.log(`triviaGame.receiveTimerData() just received: ${secondsRemaining} seconds remaining.`);
    DOM.render("timeRemaining");
    // Only take further action if time has run out
    if (secondsRemaining <= 0) {
      console.log(`triviaGame.receiveTimerData entered its 'if' statement for 0 seconds left.`)
      this.stopTimer();
      // Is game on question screen or transition screen?
      if (this._questionIsActive) {
        console.log(`triviaGame.receiveTimerData entered its 'if' statement for being on 'question' screen.`)
        // Game is on a question screen, time has ran out and no choice received by player
        this.questionWasUnanswered();
      } else {
        console.log(`triviaGame.receiveTimerData entered its 'if' statement for being on 'transition' screen.`)
        // Game is on a transition screen, time has ran out and it's time to ask the next question
        this.nextQuestion();
      }
    } else {/* Do nothing b/c there is still more time */}
  },

  // 'Game Over' view rendered to page
  gameIsOver() {
    DOM.render("gameOver");
  },

  // Resets game props, renders first question to screen for player
  start() {
    triviaProps.resetGame();
    this._questionsLeft = triviaQuestions._questionObj.length;
    this.nextQuestion();
  },

  // Runs once when page is first loaded
  initialize() {
    // Add controller as subscriber to countDownTimer
    countDownTimer.addSubscriber = triviaGame;
    // Render start button to page
    DOM.render("start-button");
  }
};

// Shorthand for $( document ).ready()
$(function() {
  // Listen for clicks on children of parent element, and of class ".js-listen"
  // (Conveniently ignores everything clicked not expressly designed to be heard)
  $('#js-page-content').on('click', ".js-listen", e => {
      // get text of element user clicked
      let clickValue = e.target.innerText;
      console.log(`${clickValue} was just clicked`);
      // pass user clicks to triviaGame object
      triviaGame.clickHandler(clickValue);
  });
});

// When game first starts, initialize round
triviaGame.initialize();
