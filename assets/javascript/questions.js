// Holds bank of trivia questions, choices to offer, and correct answer
const triviaQuestions = {
  _questionObj: [
    {
      question: "In which month is the Earth closest to the Sun?",
      choices: ["January","April","July","October"],
      answerIndex: 0
    },
    {
      question: "What is the most abundant element in Earth's atmosphere?",
      choices: ["Hydrogen","Oxygen","Carbon","Nitrogen"],
      answerIndex: 3
    },
    {
      question: "What is the most abundant metal in the earth's crust?",
      choices: ["Aluminum","Iron","Titanium","Copper"],
      answerIndex: 0
    },
    {
      question: "What is the second most abundant element in Earth's atmosphere?",
      choices: ["Oxygen","Hydrogen","Carbon","Helium"],
      answerIndex: 0
    },
    {
      question: "How many planets in our Solar System have moons?",
      choices: ["Nine","Six","Five","Three"],
      answerIndex: 1
    },
    {
      question: "What planet in our Solar System has the most gravity?",
      choices: ["Mars","Mercury","Jupiter","Saturn"],
      answerIndex: 2
    },
    {
      question: "What is the hottest planet in our Solar System?",
      choices: ["Venus","Mercury","Saturn","Mars"],
      answerIndex: 0
    },
    {
      question: "Which planet in our solar system spins the fastest?",
      choices: ["Mercury","Venus","Jupiter","Earth"],
      answerIndex: 2
    },
  ],

  getQuestionObj(index) {
    return this._questionObj[index];
  }
};

/*===========================================================================*/
