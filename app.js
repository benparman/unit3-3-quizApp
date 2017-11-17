'use strict';

//*******************
//*******************
//Question Database
//*******************
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
      '200possibleAnswersmm Traxle -Bolt',
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
//*******************
//STORE
//*******************
//*******************

const STORE = {
  currentQuestion: 0,
  questionCounter: 0,
  correctCounter: 0,
  userAnswer: ''
}

//*******************
//*******************
//Template Generators
//*******************
//*******************

function generateQuestionPage() {
  let questionIndex = STORE.currentQuestion;
  let answers = questionDatabase[questionIndex].possibleAnswers;
  STORE.questionCounter++;

  return `<div>
    <div class = "questions-answered">
      <p>Question ${STORE.questionCounter}</p>
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
            <p>Current score: ${STORE.correctCounter}</p>
        </div>
    </form>
  </div>`
  ;
}

function generateAnswerFeedback() {
  if (STORE.userAnswer === questionDatabase[STORE.currentQuestion].correctAnswer) {
    return; //WRITE HTML FOR CORRECT ANSWER FEEDBACK HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  else {
    return; //WRITE HTML FOR NOT-CORRECT ANSWER FEEDBACK HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
}

function generateStartPage() {
  return `<div>
  <h3 id = "js-subTitle">Are you a MTB gearhead?  Click the Start Quiz button below to find out.</h3>
  <button id = "js-startButton">Start Quiz</button>
</div>`
}

//*******************
//*******************
//HTML Renderers
//*******************
//*******************

function renderQuestionView() {
  let questionView = generateQuestionPage();
  $('.js-content').html(questionView)
}

function renderAnswerFeedback() {
  let answerView = generateAnswerFeedback();
  $('.js-content').html(answerView)
}

function renderStart () {
  $('#js-content').html(generateStartPage());
}

//*******************
//*******************
//Event Handlers
//*******************
//*******************
//call rendering functions inside of handleUserInputs() function
function handleUserInputs(){
  $('.js-content').on('click', '#js-startButton', event => {
    renderQuestionView();
  })
  $('.js-content').on('click', '#js-answer-submit-button', event => {
    event.preventDefault();
    //update userAnswer in STORE to the user's answer choice
    STORE.userAnswer = $('input[type=radio][name=answer]:checked').val();

    //Ensure that user has made a selection
    if (!('input[name = \'answer\']').is(';checked')) {
      alert('You must select an answer from the list!');
    }
    //check to see if user answer === correct answer
    if (STORE.userAnswer === questionDatabase[STORE.currentQuestion].correctAnswer) {
      STORE.correctCounter++;
      renderAnswerFeedback();
    }
    else {
      renderAnswerFeedback();
    }
  })
}



//*******************
//*******************
//Run on page load
//*******************
//*******************

$(function(){
  handleUserInputs();
});