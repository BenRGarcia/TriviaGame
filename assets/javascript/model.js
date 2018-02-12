// MODEL - directly manages the data, logic and rules of the application

/*===========================================================================*/
// Accepts initial set time, counts down by second, publishes state change to subscribers
const countDownTimer = {
  _timeRemaining: 0,
  _timeoutId: 0,
  _intervalIdTimer: 0,
  _intervalIdPublish: 0,
  _subscribers: [],

  // Add subscribers who need state of countDownTimer._timeRemaining
  set addSubscriber(newSubscriber) {
    // Reject new subscribers without required 'receiveData()' property
    if (Object.keys(newSubscriber).indexOf("receiveTimerData") !== -1) {
      countDownTimer._subscribers.push(newSubscriber);
      // console.log(`Subscriber object '${newSubscriber._objName}' added to countDownTimer's subscriber list`);
    } else {console.log(`Subscriber '${newSubscriber}' not added.`);} // Delete 'else' when done debugging
  },

  set setTimeRemaining(seconds) {
    // console.log(`countDownTimer.setTimeRemaining() was called`);
    countDownTimer.reset();
    if (typeof seconds === "number") {
      // console.log(`countDownTimer.setTimeRemaining just received ${seconds} seconds`);
      countDownTimer._timeRemaining = seconds;
      countDownTimer.start();
    } else console.log(`countDownTimer object's 'timeRemaining' property not set. '${minutes}' and '${seconds}' are not both numbers.`);
  },

  start() {
    // console.log(`countDownTimer.start() was called`);
    countDownTimer._intervalIdPublish = setInterval(countDownTimer.publish, 1000);
    // setTimeout() will offset and give publish() time to run
    countDownTimer._timeoutId = setTimeout( () => {
      countDownTimer._intervalIdTimer = setInterval(countDownTimer.countDown, 1000);
    }, 200);
  },

  countDown() {
    // console.log(`countDownTimer.countDown() was called`);
    if (countDownTimer._timeRemaining > 0) {
      countDownTimer._timeRemaining--;
    } else {
      countDownTimer.reset();
      console.log(`Help! countDownTimer.countDown() was called when there was no time left!`);
    }
  },

  publish() {
    // console.log(`countDownTimer.publish() was called`);
    let totalSubscribers = countDownTimer._subscribers.length;
    for (let i = 0; i < totalSubscribers; i++) {
      countDownTimer._subscribers[i].receiveTimerData(countDownTimer._timeRemaining);
      if (countDownTimer._timeRemaining <= 0) {
        countDownTimer.reset();
      }
    }
  },

  reset() {
    // console.log(`countDownTimer.reset() was called`);
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
        Object.keys(obj).indexOf("answer") !== -1)
    {
      this._questionObj = obj;
      console.log(`triviaProps just set a new question object which asks: ${this.question}`);
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
    return this._questionObj.answer
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
    console.log(`triviaProps just added 1 to _correctCount`);
    this._correctCount++;
    return this._correctCount;
  },

  incrementIncorrect() {
    console.log(`triviaProps just added 1 to _incorrectCount`);
    this._incorrectCount++;
    return this._incorrectCount;
  },

  incrementUnanswered() {
    console.log(`triviaProps just added 1 to _unansweredCount`);
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
// Holds bank of trivia questions, choices to offer, and correct answer
const triviaQuestions = {
  _questionObj: [
    {
      question: "In which month is the Earth closest to the Sun?",
      choices: ["January","April","July","October"],
      answer: "January"
    },
    {
      question: "What is the most abundant element in Earth's atmosphere?",
      choices: ["Hydrogen","Oxygen","Carbon","Nitrogen"],
      answer: "Nitrogen"
    },
    {
      question: "What is the most abundant metal in the earth's crust?",
      choices: ["Aluminum","Iron","Titanium","Copper"],
      answer: "Aluminum"
    },
    {
      question: "What is the second most abundant element in Earth's atmosphere?",
      choices: ["Oxygen","Hydrogen","Carbon","Helium"],
      answer: "Oxygen"
    },
    {
      question: "How many planets in our Solar System have moons?",
      choices: ["Nine","Six","Five","Three"],
      answer: "Six"
    },
    {
      question: "What planet in our Solar System has the most gravity?",
      choices: ["Mars","Mercury","Jupiter","Saturn"],
      answer: "Jupiter"
    },
    {
      question: "What is the hottest planet in our Solar System?",
      choices: ["Venus","Mercury","Saturn","Mars"],
      answer: "Venus"
    },
    {
      question: "Which planet in our solar system spins the fastest?",
      choices: ["Mercury","Venus","Jupiter","Earth"],
      answer: "Jupiter"
    },
  ],

  getQuestionObj(index) {
    return this._questionObj[index];
  }
};

/*===========================================================================*/
