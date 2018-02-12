// VIEW - output representation of information






// rendering object to go here

// Views that need to be assembled, rendered
/*
 * Game Begins:
 *     - Component #1
 * 
 * Question Asked:
 *     - Components #2, #3, #4
 * 
 * Question Answered wrong:
 *     - Components #2, #3, #5
 * 
 * Question Answered right:
 *     - Components #2, #3, #6
 * 
 * Game Over:
 *     - Components #7, #8
 */
// const header = '<div class="cell"><a href="https://github.com/BenRGarcia/Star-Wars-RPG" target="_blank">View Source Code</a></div><div class="cell"><h1 class="title">Planetary Trivia!</h1></div>';
// const startButton = '<div class="cell"><button class="button large alert start-button js-listen">START</button></div>';


/*
 * Bundled component string names:
 *     "initialize":  .html(components.header/startButton)
 *     "question":    .empty() #js-page-content, body.append(components.timer/question/choices)
 *     "wrongAnswer": .remove("#js-remove") choices, body.append(component.incorrect) 
 *     "rightAnswer": .remove("#js-remove") choices, body.append(component.correct) 
 *     "unanswered":  .remove("#js-remove") choices, body.append(component.unanswered) 
 *     "gameOver":    .empty() #js-page-content, body.append(component.gameOverStats)
 * 
 */


const DOM = {
  render(component) {
    let header = $("#js-header");
    let body = $("#js-page-content");
    // console.log(`DOM.render() was just called to render ${component}`);

    if (component === "start-button") {
      body.html(components.startButton);
    }

    if (component === "header") {
      header.empty();
      header.html(components.header);
    }
  }
};