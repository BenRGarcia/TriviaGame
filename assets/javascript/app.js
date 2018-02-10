// MODEL
// - Objects

/*
 * 
 * 
 */
// Which object will track time? gameProps? controller? separate object?

const timer = {
  questionLimit: 10000, // 10 seconds
  transitionLimit: 4000, // 4 seconds
  isQuestionTimeUp() {

    var start = Date.now();

    setTimeout(function() {

      var elapsed = Date.now() - start

      while (  < this.questionLimit) {

        // Date.now()
        // setTimeout()
        // setInterval()
        // clearInterval()
        // Date.getTime()
        // https://www.sitepoint.com/creating-accurate-timers-in-javascript/

      }

    }, 100);

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