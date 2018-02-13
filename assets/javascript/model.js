// MODEL - directly manages the data, logic and rules of the application

/*===========================================================================*/
// Accepts initial set time, counts down by second, publishes state change to subscribers
const countDownTimer = {
  _timeRemaining: 0,
  _timeoutId: 0,
  _intervalIdTimer: 0,
  _intervalIdPublish: 0,
  _subscribers: [],

  set addSubscriber(newSubscriber) {
    if (Object.keys(newSubscriber).indexOf("receiveTimerData") !== -1) {
      countDownTimer._subscribers.push(newSubscriber);
    }
  },

  set setTimeRemaining(seconds) {
    countDownTimer.reset();
    if (typeof seconds === "number") {
      countDownTimer._timeRemaining = seconds;
      countDownTimer.start();
    }
  },

  start() {
    countDownTimer._intervalIdPublish = setInterval(countDownTimer.publish, 1000);
    countDownTimer._timeoutId = setTimeout( () => {
      countDownTimer._intervalIdTimer = setInterval(countDownTimer.countDown, 1000);
    }, 200);
  },

  countDown() {
    if (countDownTimer._timeRemaining > 0) {
      countDownTimer._timeRemaining--;
    } else {
      countDownTimer.reset();
    }
  },

  publish() {
    let totalSubscribers = countDownTimer._subscribers.length;
    for (let i = 0; i < totalSubscribers; i++) {
      countDownTimer._subscribers[i].receiveTimerData(countDownTimer._timeRemaining);
      if (countDownTimer._timeRemaining <= 0) {
        countDownTimer.reset();
      }
    }
  },

  reset() {
    clearInterval(countDownTimer._intervalIdTimer);
    clearInterval(countDownTimer._intervalIdPublish);
    clearTimeout(countDownTimer._timeoutId);
    countDownTimer._timeRemaining = 0;
  },
};

/*===========================================================================*/
// Contains files paths to animated .gif's
const gifs = {
  correct:   "./assets/images/dancing-earth.gif",
  incorrect: "./assets/images/sad-earth.gif",
  gameOver:  "./assets/images/happy-earth.gif"
};

/*===========================================================================*/
// Manages trivia game's state
const triviaProps = {
  _correctCount: 0,
  _incorrectCount: 0,
  _unansweredCount: 0,
  _questionObj: {},

  set questionObj(obj) {
    if (Object.keys(obj).indexOf("question") !== -1 &&
        Object.keys(obj).indexOf("choices") !== -1 &&
        Object.keys(obj).indexOf("answerIndex") !== -1)
    {
      this._questionObj = obj;
    }
    else
    {
      console.log(`Question object ${obj} not set. Required properties not present`);
    }
  },

  get question() {
    return this._questionObj.question;
  },

  get choices() {
    return this._questionObj.choices;
  },

  get answer() {
    let q = this._questionObj;
    return q.choices[q.answerIndex];
  },

  get correctCount() {
    return this._correctCount;
  },

  get incorrectCount() {
    return this._incorrectCount;
  },

  get unansweredCount() {
    return this._unansweredCount;
  },

  incrementCorrect() {
    this._correctCount++;
    return this._correctCount;
  },

  incrementIncorrect() {
    this._incorrectCount++;
    return this._incorrectCount;
  },

  incrementUnanswered() {
    this._unansweredCount++;
    return this._unansweredCount;
  },

  resetGame() {
    this._correctCount = 0;
    this._incorrectCount = 0;
    this._unansweredCount = 0;
    this._questionObj = {};
    return this;
  }
};

/*===========================================================================*/
