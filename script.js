const quizData = [
  {
    question: "What does HTML stand for?",
    a: "Hyper Text Markup Language",
    b: "Home Tool Markup Language",
    c: "Hyperlinks and Text Markup Language",
    d: "Hyper Tool Markup Language",
    correct: "a",
  },
  {
    question: "Which language is used to style web pages?",
    a: "CSS",
    b: "JavaScript",
    c: "Python",
    d: "HTML",
    correct: "a",
  },
  {
    question: "What is the correct HTML tag for inserting a line break?",
    a: "lb",
    b: "br",
    c: "break",
    d: "newline",
    correct: "b",
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    a: "font",
    b: "style",
    c: "styles",
    d: "class",
    correct: "b",
  },
  {
    question: "Which HTML element is used to define the body of the page?",
    a: "header",
    b: "footer",
    c: "body",
    d: "section",
    correct: "c",
  },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const submitBtn = document.getElementById("submit-btn");
const resultEl = document.getElementById("quiz-result");
const scoreEl = document.getElementById("quiz-score");
const loginContainer = document.getElementById("login-container");
const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const loginError = document.getElementById("login-error");

function loadQuiz() {
  const currentQuizData = quizData[currentQuestion];
  questionEl.innerText = currentQuizData.question;

  optionsEl.innerHTML = `
    <li>
      <input type="radio" name="answer" value="a" id="a">
      <label for="a">${currentQuizData.a}</label>
    </li>
    <li>
      <input type="radio" name="answer" value="b" id="b">
      <label for="b">${currentQuizData.b}</label>
    </li>
    <li>
      <input type="radio" name="answer" value="c" id="c">
      <label for="c">${currentQuizData.c}</label>
    </li>
    <li>
      <input type="radio" name="answer" value="d" id="d">
      <label for="d">${currentQuizData.d}</label>
    </li>
  `;
}

function getSelected() {
  const answers = document.querySelectorAll('input[name="answer"]');
  let selectedAnswer;
  answers.forEach((answer) => {
    if (answer.checked) {
      selectedAnswer = answer.value;
    }
  });
  return selectedAnswer;
}

function showNextQuestion() {
  const selectedAnswer = getSelected();
  if (selectedAnswer === quizData[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuiz();
    resultEl.innerText = "";
  } else {
    quizContainer.innerHTML = `
      <h2>You've completed the quiz!</h2>
      <p>Your score: ${score}/${quizData.length}</p>
      <button onclick="location.reload()">Reload Quiz</button>
    `;
  }
}

function handleLogin() {
  const username = usernameInput.value.trim();
  if (username === "") {
    loginError.innerText = "Please enter a valid username.";
  } else {
    loginContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuiz();
  }
}

loginBtn.addEventListener("click", handleLogin);

submitBtn.addEventListener("click", () => {
  const selectedAnswer = getSelected();
  if (selectedAnswer) {
    showNextQuestion();
  } else {
    resultEl.innerText = "Please select an answer!";
  }
});
