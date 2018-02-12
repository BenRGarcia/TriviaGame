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

const startButton = '<div class="cell"><button class="button large alert start-button js-listen">START</button></div>';

 const DOM = {
  render(component) {
    let pageHook = $("#js-page-content");
    pageHook.empty();
    // console.log(`DOM.render() was just called to render ${component}`);

    if (component === "start-button") {
      pageHook.html(startButton);
    }
  }
 };