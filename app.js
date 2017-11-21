'use strict';

//*******************
//Question Database
//*******************

const questionDatabase = 
[
  {
    question: 'There has been a recent trend shift in mountain bike geometry in recent years (now being 2017).  Which option best describes this shift?',
    correctAnswer: 'Long, Slack, and Low',
    possibleAnswers: [
      'Long, Slack, and Low',
      'Short, Tall, and Steep',
      'Obtuse, parallel, and perpendicular',
      'Triangular, curvy, and straight',
      'Long chainstays, short top tubes, and vertical head tubes'
    ]
  },
  {
    question: 'What standard in rear wheel dropouts replaced the 135mm quick release?',
    correctAnswer: '142mm Thru-Axle',
    possibleAnswers: [
      '142mm Thru-Axle',
      '200mm Traxle -Bolt',
      'The english threaded reverse bolt',
      'Boost 148',
      'BSA Tapered Spindle'
    ]
  },
  {
    question: 'What suspension feature should be adjusted to prevent unwanted ‘dive’ under braking?',
    correctAnswer: 'Low-speed compression damping',
    possibleAnswers: [
      'Low-speed compression damping',
      'Rebound Damping',
      'Negative air spring pressure',
      'Lockout force threshold',
      'Top-out bumper return spring preload'
    ]
  },
  {
    question: 'Coil springs have been largely replaced by air springs in modern bicycle suspension systems.  In which riding discipline will you still find prevalent usage of coil springs?',
    correctAnswer: 'Downhill & Enduro',
    possibleAnswers: [
      'Downhill & Enduro',
      'World-cup cross country racing',
      'Ultra-Endurance',
      'Short Track',
      'Dirt Jumping & BMX'
    ]
  },
  {
    question: 'The trend in 1x11 drivetrains was led by SRAM and their development of the XD freehub body.  The XD freehub body provided what capability over a standard splined freehub body?',
    correctAnswer: 'The ability to utilize a 10 tooth cassette cog',
    possibleAnswers: [
      'The ability to utilize a 10 tooth cassette cog',
      'Free-floating midrange spider compatibility',
      'Reverse-cut outboard carrier bearing housing',
      'One-piece cassette compatibility',
      'Nothing, it was simply a ploy to monopolize the drivetrain market by using proprietary technology'
    ]
  }
];

//*******************
//STORE
//*******************

const STORE = {
  currentQuestion: 0,
  questionCounter: 0,
  correctCounter: 0,
  userAnswer: ''
};

//*******************
//Template Generators
//*******************

function generateQuestionPage() {
  let questionIndex = STORE.currentQuestion;
  let answers = questionDatabase[questionIndex].possibleAnswers;
  STORE.questionCounter++;
  return `<div>
    <div class = "questions-answered">
      <p>Question ${STORE.questionCounter} of ${questionDatabase.length}</p>
    </div>
    <form>
      <h3>${questionDatabase[questionIndex].question}</h3>
        <div>
          <input type = "radio" id = "${answers[0]}" name = "answer" value = "${answers[0]}">
          <label for = "${answers[0]}">${answers[0]}</label>
          <br>
          <input type = "radio" id = "${answers[1]}" name = "answer" value = "${answers[1]}">
          <label for = "${answers[1]}">${answers[1]}</label>
          <br>
          <input type = "radio" id = "${answers[2]}" name = "answer" value = "${answers[2]}">
          <label for = "${answers[2]}">${answers[2]}</label>
          <br>
          <input type = "radio" id = "${answers[3]}" name = "answer" value = "${answers[3]}">
          <label for = "${answers[3]}">${answers[3]}</label>
          <br>
          <input type = "radio" id = "${answers[4]}" name = "answer" value = "${answers[4]}">
          <label for = "${answers[4]}">${answers[4]}</label>
          <br>
        </div>
        <div class="user-input">
            <button name= "submit-button" id= "js-answer-submit-button" class= "input-button" type= "submit" >Submit Answer</button>
        </div>
        <div class= "current-score">
            <p>Current score: ${STORE.correctCounter} of ${questionDatabase.length}</p>
        </div>
    </form>
  </div>`;
}

function generateAnswerFeedback() {
  let questionIndex = STORE.currentQuestion;
  let nextButton = '';
  let buttonID = '';
  if (STORE.questionCounter < questionDatabase.length) {
    nextButton = 'Next Question';
    buttonID = 'js-next-question-button';
  }
  else {
    nextButton = 'Show Results';
    buttonID = 'js-show-results-button';
  }

  if (STORE.userAnswer === questionDatabase[STORE.currentQuestion].correctAnswer) {
    return `<div>
    <div class = "questions-answered">
      <p>Question ${STORE.questionCounter}</p>
    </div>
    <form>
      <h3>${questionDatabase[questionIndex].question}</h3>
        <div>
          <h4>You are correct!</h4>
          <h5>${STORE.userAnswer}</h5>
        </div>
        <div class="user-input">
            <button name= "next-button" id= "${buttonID}" class= "input-button" type= "submit" >${nextButton}</button>
        </div>
        <div class= "current-score">
            <p>Current score: ${STORE.correctCounter} of ${questionDatabase.length}</p>
        </div>
    </form>
  </div>`;
  }
  else {
    return `<div>
    <div class = "questions-answered">
      <p>Question ${STORE.questionCounter}</p>
    </div>
    <form>
      <h3>${questionDatabase[questionIndex].question}</h3>
        <div>
          <h4>Sorry, you are incorrect!  The correct answer is:</h4>
          <h5>${questionDatabase[questionIndex].correctAnswer}</h5>
        </div>
        <div class="user-input">
            <button name= "next-button" id= "${buttonID}" class= "input-button" type= "submit" >${nextButton}</button>
        </div>
        <div class= "current-score">
            <p>Current score: ${STORE.correctCounter} of ${questionDatabase.length}</p>
        </div>
    </form>
  </div>`;
  }
}

function generateSummaryView() {
  let percentScore = (STORE.correctCounter/questionDatabase.length)*100;
  return `<div>
  <form>
    <h3>Finished!  You scored ${STORE.correctCounter} out of ${STORE.questionCounter}.  That's ${percentScore}% correct.</h3>
      <div>
        <h4>Want to take the quiz again?  Click the "Restart Quiz" button below!</h4>
      </div>
      <div class="user-input">
          <button name= "next-button" id= "js-quiz-restart-button" class= "input-button" type= "submit" >Restart Quiz</button>
      </div>
  </form>
</div>`;
}

function generateStartPage() {
  STORE.currentQuestion = 0;
  STORE.questionCounter = 0;
  STORE.correctCounter = 0;
  STORE.userAnswer = '';
  return `    <div>
  <h3 id = "js-subTitle">Are you a MTB gearhead?  Click the Start Quiz button below to find out.</h3>
  <button id = "js-startButton">Start Quiz</button>
</div>`;
}

//*******************
//HTML Renderers
//*******************

function renderQuestionView() {
  let questionView = generateQuestionPage();
  $('.js-content').html(questionView);
}

function renderAnswerFeedback() {
  let answerView = generateAnswerFeedback();
  $('.js-content').html(answerView);
}

function renderSummaryView() {
  let summaryView = generateSummaryView();
  $('.js-content').html(summaryView);
}

function renderStart () {
  let startView = generateStartPage();
  $('.js-content').html(startView);
}

//*******************
//Event Handlers
//*******************

//call rendering functions inside of handleUserInputs() function
function handleUserInputs(){
  $('.js-content').on('click', '#js-startButton', event => {
    event.preventDefault();
    renderQuestionView();
  });
  
  $('.js-content').on('click', '#js-answer-submit-button', event => {
    event.preventDefault();
    //update userAnswer in STORE to the user's answer choice
    STORE.userAnswer = $('input[type=radio][name=answer]:checked').val();

    //Ensure that user has made a selection
    if (!$('input[name=\'answer\']').is(':checked')) { 
      alert('You must select an answer from the list!');
      return;
    }
    //check to see if user answer === correct answer
    if (STORE.userAnswer === questionDatabase[STORE.currentQuestion].correctAnswer) {
      STORE.correctCounter++;
      renderAnswerFeedback();
    }
    else {
      renderAnswerFeedback();
    }
  });

  $('.js-content').on('click', '#js-next-question-button', event => {
    event.preventDefault();
    STORE.currentQuestion++;
    if (STORE.questionCounter < questionDatabase.length) {
      renderQuestionView();
    }
    $('.js-content').on('click', '#js-show-results-button', event => {
      event.preventDefault();
      renderSummaryView();
    });

    $('.js-content').on('click', '#js-quiz-restart-button', event => {
      event.preventDefault();
      renderStart();
    });

  }); 
}

//*********************************************
//Run on page load + Initialize Event Listeners
//*********************************************

$(function(){
  handleUserInputs();
});

