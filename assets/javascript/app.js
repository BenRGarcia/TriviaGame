// CONTROLLER - accepts input and converts it to commands for the model or view

// Method list:
/*
 * 1) Initialize game when it first starts
 * 
 * 2) Reset game when 'start' or 'start over' is clicked
 * 
 * 3) Handle user clicks, 2 categories: a) start/start over, b) question guess
 * 
 * 4) add next question to triviaProps question object, render to screen, set timer
 * 
 * 5) handle if timer runs out of seconds "out of time"
 * 
 * 6) handle user guesses if right
 * 
 * 7) handle user guess if wrong
 * 
 * 8) handle when game is over (no more questions remain)
 * 
 * 
 * 
 * 
 * 
 */

const triviaGame = {
  questionsLeft: 0,
  questionIsActive: false,
  
  // Handle user clicks, 2 categories: a) start/start over, b) question guess
  clickHandler(clickValue) {

    // Player is ready to start game
    if (clickValue === "START" || clickValue === "START OVER?") {
      console.log(`Click value '${clickValue}' received by triviaGame.clickHandler`);
      // Start new round
      this.startGame();
      this.nextQuestion();
    } 
    // User has guessed the answer to the trivia question
    else {
      evaluate(clickValue);
      console.log(`Player has guessed answer choice: ${clickValue}`);
    }
  },

  // Is user guess right or wrong?
  evalute(choice) {

    // Clear countDownTimer b/c guess was received
    countDownTimer.reset();
    
    console.log(`Player guess received by triviaGame.evaluate(), and...`);
    if (choice === triviaProps.answer) {
      // user guess was right
      console.log(`User guess of ${choice} was correct!!`);
      this.guessWasRight();
    } else {
      // user guess was wrong
      console.log(`User guess of ${choice} did not match answer of ${triviaProps.answer}`);
      this.guessWasWrong();
    }
  },

  guessWasRight() {
    // Do stuff... when the player guessed right
    this.questionIsActive = false;
    triviaProps.incrementCorrect();
  },

  guessWasWrong() {
    // Do stuff... when the player guessed wrong
    this.questionIsActive = false;
    triviaProps.incrementIncorrect();
  },

  questionWasUnanswered() {
    this.questionIsActive = false;
  },
  
  nextQuestion() {

    this.questionIsActive = true

    // start the timer countdown
    countDownTimer.setTimer = 15;
    // Remove contents of #js-page-content before adding new content
    // DOM.render('clearScreen');

    // only set next question if more questions remain
    if (this.questionsLeft > 0) {
      // load next question to question object

    } else {
      // game is over, show game stats and 'START OVER?' button
    }
    // triviaProps.questionObj = triviaQuestions.getQuestionObject[];
  },

  // Set countDownTimer's initial count down amount
  setTimer(seconds) {
    countDownTimer.timeRemaining = seconds;
  },

  receiveTimerData(secondsRemaining) {

    if (this.questionIsActive) {
      // countdown is for question
      if (secondsRemaining <= 0) {
        console.log(`Time to answer the question ran out!`);
        // question went unanswered when time ran out
        countDownTimer.reset();
        this.questionWasUnanswered();
      }
    } else {
      // countdown is for transition to next question
      if (secondsRemaining <= 0) {
        // animated gif on screen already, time to queue next question
      }
    }

    // If time runs out
    if (secondsRemaining <= 0) {
      countDownTimer.reset();
      this.timeRanOut();
    } else {/* Do nothing... */}
  },

  startGame() {
    triviaProps.resetGame();
    this.questionsLeft = triviaQuestions._questionObj.length;
    this.nextQuestion();
  },

  initialize() {

    this.startGame();

    // Add subscribers to countDownTimers
    countDownTimer.addSubscriber = triviaGame;
    // countDownTimer.addSubscriber = DOM; (uncomment line after view is finished)

    // Render start button to page
    // DOM.render("start-button"); (uncomment line after view is finished)

  }
};

// When game first starts, initialize round
triviaGame.initialize();

// Shorthand for $( document ).ready()
$(function() {

  // Listen for clicks on children of parent element of class ".js-listen"
  $('#js-page-content').on('click', ".js-listen", e => {

      // get text of element user clicked
      let clickValue = e.target.innerText;
      console.log(`${clickValue} was just clicked`);

      // pass user clicks to triviaGame object
      triviaGame.clickHandler(clickValue);
  });
});
