// VIEW - output representation of information

const DOM = {
  render(component) {
    let body = $("#js-page-content");
    switch (component) {
      case "timeRemaining":
        $("#js-time-remaining").text(countDownTimer._timeRemaining);
        break;
      case "initialize":
        $("#js-header").append(components.header);
        body.append(components.startButton);
        break;
      case "question":
        body.empty();
        body.append(components.timer + components.question + components.choices);
        break;
      case "wrongAnswer":
        $("#js-remove").remove();
        body.append(components.incorrect);
        break;
      case "rightAnswer":
        $("#js-remove").remove();
        body.append(components.correct);
        break;
      case "unanswered":
        $("#js-remove").remove();
        body.append(components.unanswered);
        break;
      case "gameOver":
        body.empty();
        body.append(components.gameOverStats + components.startOverButton);
        break;
      default:
        console.log(`Component ${component} failed to render`);
        break;
    }
  }
};
