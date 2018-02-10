// MODEL
// - Objects


const timer = {
  _timeRemaining: 0,
  _intervalId: 0,

  set timeRemaining(seconds) {
    if (typeof seconds === "number") {
      let milliseconds = seconds * 1000;
      this._timeRemaining() = milliseconds;
      return this._timeRemaining;
    } else {
      console.log(`Timer object's 'timeRemaining' property not set. '${seconds}' is not a number`);
    }
  },

  get timeRemaining() {
    console.log(`timer object's 'get timeRemaining' just called`);
    return this._timeRemaining / 1000;
  }

  start() {
    this._intervalId = setInterval( () => {
      this.countDown();
    } , 1000);
  },

  countDown() {
    this._timeRemaining--;
    console.log(`Time remaining: ${this._timeRemaining / 1000} seconds`);
    if (this._timeRemaining <= 0) {
      this.reset();
    }
    return this._timeRemaining;
  },

  reset() {
    clearInterval(this._intervalId);
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
  correct: "./assets/images/dancing-earth.gif",
  incorrect: "./assets/images/sad-earth.gif",
  gameOver: "./assets/images/happy-earth.gif"
};



















// CONTROLLER
// Event handlers, keep track of time