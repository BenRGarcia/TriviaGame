// MODEL - directly manages the data, logic and rules of the application

/*
 * Object Directory:
 * 
 * "gifs"
 *     - Contains files paths to animated .gif's
 * 
 * "countDownTimer"
 *     - Accepts initial set time, counts down by second,
 *       publishes state change to subscribers
 * 
 * "triviaProps"
 *     - Manages trivia game's state
 * 
 * "triviaQuestions"
 *     - Holds bank of trivia questions, choices to offer, 
 *       and correct answer
 */

/*===========================================================================*/
// Contains files paths to animated .gif's
export const gifs = {
  correct:   "./assets/images/dancing-earth.gif",
  incorrect: "./assets/images/sad-earth.gif",
  gameOver:  "./assets/images/happy-earth.gif"
};

/*===========================================================================*/
// Accepts initial set time, counts down by second, publishes state change to subscribers
export const countDownTimer = {
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

  set timeRemaining(seconds) {
    if (typeof seconds === "number") 
    {
      this._timeRemaining = seconds;
      this.publish();
      return seconds;
    } 
    else 
    {
      console.log(`countDownTimer object's 'timeRemaining' property not set. '${minutes}' and '${seconds}' are not both numbers.`);
    }
  },

  start() {
    this._intervalId = setInterval( () => {
      this.countDown();
    } , 1000);
    return this._intervalId;
  },

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

/*===========================================================================*/
// Manages trivia game's state
export const triviaProps = {
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
      return true;
    } else {
      console.log(`Incorrect!`);
      return false;
    }
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
// Holds bank of trivia questions, choices to offer, and correct answer
export const triviaQuestions = {
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
