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

 /* FUNCTION # 1 */
 // clickHandler()

  // split clicks into 2 categories: 1) start/start over, 2) player chose an answer

    // 1) start/start over
      // start the game by asking 1st question, call start()

    // 2) player chose an answer
      // pass the answer choice to a function that evaluates if right or wrong


/* FUNCTION # 2 */
// nextQuestion()

  // if questions left is > 0 (still more questions to ask)
  
    // set _questionIsActive to true
    // decrement _questionsLeft
    // render next question to appear on the page (index of question array at [length - 1])
    // start timer countdown

  // else game is over, call gameIsOver()


/* FUNCTION # 3 */
// evaluate(choice)

  // Because answer choice was received, stop timer
  // set _questionIsActive to false

  // evaluate the user's guess if right or wrong

    // If right, call triviaGame.guessWasRight()
    // If wrong, call triviaGame.guessWasWrong()


/* FUNCTION # 4 */
// guessWasRight()

  // increment triviaProps correctCount
  // render appropriate gif/transitional view to page
  // set timer for 5 seconds before triggering next question


/* FUNCTION # 5 */
// guessWasWrong()

  // increment triviaProps incorrectCount
  // render appropriate gif/transitional view to page
  // set timer for 5 seconds before triggering next question


/* FUNCTION # 6 */
// guessWasUnanswered()

  // set isQuestionActive to false
  // increment triviaProps unansweredCount
  // render appropriate gif/transitional view to page
  // set timer for 5 seconds before triggering next question


/* FUNCTION # 7 */
// setTimer(seconds)

  // will call on countDownTimer to set the initial timer amount, automatically countdown/broadcast


/* FUNCTION # 8 */
// stopTimer()

  // will call on countDownTimer to stop/reset everything


/* FUNCTION # 9 */
// receiveTimerData(secondsRemaining)

  // will receive automated broadcasts of seconds remaining
  // will send seconds remaining to DOM.render()

  // 1) Only take action if time left is 0

    // Stop/reset timer since it's no longer needed now that time has run out

    // 2) Determine if questionIsActive (whether or not player is on a question or a transition)

      // 3a) If on a question, (player ran out of time)
        // call guessWasUnanswered()

      // 3a) If on a transition, time for the next question
        // call nextQuestion()


/* FUNCTION # 10 */
// gameIsOver()

  // call this function when there are no questions remaining
  // render game over view to page


/* FUNCTION # 11 */


/* FUNCTION # 12 */




/* FUNCTION # 13 */
// start()

  // reset triviaProps object
  // find out how many questions there are, set _questionsLeft
  // call triviaGame.nextQuestion()


/* FUNCTION # 14 */
// initialize()

  // (only runs when the page is first loaded)
  // add subscribers to subscriber list in countDownTimer
  // render start button to page



const triviaGame = {
  _questionsLeft: 0,
  _questionIsActive: false,
  _questionTimeLimit: 10,
  _transitionTimeLimit: 5,
  
  // Handle user clicks, 2 categories: a) start/start over, b) player chose an answer
  clickHandler(clickValue) {

    // Player is ready to start game
    if (clickValue === "START" || clickValue === "START OVER?")
    {
      console.log(`Click value '${clickValue}' received by triviaGame.clickHandler`);
      // Start new round
      this.startGame();
    } 
    // User has guessed the answer to the trivia question
    else {
      evaluate(clickValue);
      console.log(`Player has guessed answer choice: ${clickValue}`);
    }
  },

  // Is user guess right or wrong?
  evalute(choice) {

    // Clear countDownTimer b/c guess was received before time ran out
    countDownTimer.reset();
    
    console.log(`Player guess received by triviaGame.evaluate(), and...`);
    if (triviaProps.isAnswerCorrect(choice)) {
      // user guess was right
      console.log(`User guess of ${choice} was correct!!`);
      this.guessWasRight();
    } else {
      // user guess was wrong
      console.log(`User guess of ${choice} did not match answer of ${triviaProps.answer}`);
      this.guessWasWrong();
    }
  },

  // For when the player guessed right
  guessWasRight() {
    this._questionIsActive = false;
    this.setTimer(this._transitionTimeLimit);
    triviaProps.incrementCorrect();
    console.log(`Because the player's guess was right, the correctly answered count is now: ${triviaProps.correctCount}`);
  },

  // For when the player guessed wrong
  guessWasWrong() {
    this._questionIsActive = false;
    this.setTimer(this._transitionTimeLimit);
    triviaProps.incrementIncorrect();
    console.log(`Because the player's guess was wrong, the incorrectly answered count is now: ${triviaProps.incorrectCount}`);
  },

  // For when the player did not guess in the alloted time
  questionWasUnanswered() {
    this._questionIsActive = false;
    this.setTimer(this._transitionTimeLimit);
    triviaProps.incrementUnanswered();
    console.log(`Because the player did not guess, the unanswered count is now: ${triviaProps.unansweredCount}`);
  },
  
  // Add question and answer choices to the screen
  nextQuestion() {
    console.log(`triviaGame.nextQuestion was just called!`);

    this._questionIsActive = true;

    // Remove contents of #js-page-content before adding new content
    // DOM.render('clearScreen');

    // only set next question if more questions remain
    if (this._questionsLeft > 0) {
      // load next question to question object
      triviaProps.questionObj = triviaQuestions._questionObj[this._questionsLeft - 1]
      this.setTimer(this._questionTimeLimit);
      this._questionsLeft--;

    } else {
      // game is over, show game stats and 'START OVER?' button
    }
    // triviaProps.questionObj = triviaQuestions.getQuestionObject[];
  },

  // Set countDownTimer's initial count down amount
  setTimer(seconds) {
    countDownTimer.setTimeRemaining = seconds;
    console.log(`triviaGame just called countDownTimer.timeRemaining to be ${seconds} seconds.`);
    countDownTimer.start();
  },

  receiveTimerData(secondsRemaining) {
    console.log(`triviaGame.receiveTimerData just received ${secondsRemaining}`);
  },

  startGame() {
    triviaProps.resetGame();
    this._questionsLeft = triviaQuestions._questionObj.length;
    this.nextQuestion();
  },

  initialize() {

    // Add subscribers to countDownTimers
    countDownTimer.addSubscriber = triviaGame;
    // countDownTimer.addSubscriber = DOM; (uncomment line after view is finished)

    // Render start button to page
    // DOM.render("start-button"); (uncomment line after view is finished)

  }
};















// Approved code:





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
