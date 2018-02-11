// MODEL
// - Objects

// countDownTimer object to count down time remaining, publish state to subscribers
const countDownTimer = {
  _timeRemaining: 0,
  _intervalId: 0,
  _subscribers: [],

  // Add subscribers who need state of countDownTimer._timeRemaining
  set addSubscriber(newSubscriber) {
    // Reject new subscribers without required 'receiveData()' property
    if (Object.keys(newSubscriber).indexOf("receiveData") !== -1) {
      this._subscribers.push(newSubscriber);
      return newSubscriber;
    } else {
      console.log(`Subscriber '${newSubscriber}' not added. Required property 'receiveData()' not present.`);
    }
  },

  set timeRemaining(minutes, seconds) {
    if (typeof minutes === "number" &&
        typeof seconds === "number" &&
        seconds < 60) 
    {
      let totalSeconds = this.convertToSeconds(minutes, seconds);
      this._timeRemaining = totalSeconds;
      this.publish();
      return totalSeconds;
    } 
    else 
    {
      console.log(`countDownTimer object's 'timeRemaining' property not set. '${minutes}' and '${seconds}' are not both numbers.`);
    }
  },

  convertToSeconds(minutes, seconds) {
    let totalSeconds = (minutes * 60) + seconds;
    return totalSeconds;
  },

  start() {
    this._intervalId = setInterval( () => {
      this.countDown();
    } , 1000);
    return this._intervalId;
  },

  // Decrement time remaining only if time isn't up, otherwise reset countDownTimer
  countDown() {
    if (this._timeRemaining > 0) {
      this._timeRemaining--;
      this.publish();
      console.log(`Time remaining was just decremented to: ${this._timeRemaining}`);
    } else if (this._timeRemaining <= 0) {
      console.log(`countDownTimer just hit 0... countDownTimer.reset() called`);
      this.reset();
    }
    console.log(`Time remaining: ${this._timeRemaining} seconds`);
    return this._timeRemaining;
  },

  // method that will push out countDownTimer state change to subscribers
  publish() {
    let totalSubscribers = this._subscribers.length;
    for (let i = 0; i < totalSubscribers; i++) {
      this._subscribers[i].receiveData(this._timeRemaining);
    }
  },

  reset() {
    clearInterval(this._intervalId);
    this._timeRemaining = 0;
  },
};

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

  isAnswerCorrect(guess) {
    console.log(`The player guessed ${guess}, and the answer is: ${this.answer}`);
    if (guess === this.answer) {
      console.log(`Correct!`);
      // this.incrementCorrect();
      return true;
    } else {
      console.log(`Incorrect!`);
      // this.incrementIncorrect();
      return false;
    }
  },

  incrementCorrect() {
    this._correctCount++;
  },

  incrementIncorrect() {
    this._incorrectCount++;
  },

  incrementUnanswered() {
    this._unansweredCount++;
  },

  resetGame() {
    this._correctCount = 0;
    this._incorrectCount = 0;
    this._unansweredCount = 0;
    this._questionObj = {};
  }
};

// Question Bank
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

// File paths to .gif's based on game state
const gifs = {
  correct:   "./assets/images/dancing-earth.gif",
  incorrect: "./assets/images/sad-earth.gif",
  gameOver:  "./assets/images/happy-earth.gif"
};



















// CONTROLLER
// Event handlers, keep track of time