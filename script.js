
const questions = [
    {
      question: "What is the capital of Bangladesh?",
      answers: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"],
      correctAnswer: "Dhaka"
    },
    {
      question: "Who is the national poet of Bangladesh?",
      answers: ["Sheikh Mujibur Rahman", "Kazi Nazrul Islam", "Ziaur Rahman", "Abdul Hamid"],
      correctAnswer: "Kazi Nazrul Islam"
    },
    {
      question: "In which year did Bangladesh gain independence?",
      answers: ["1971", "1952", "1990", "2000"],
      correctAnswer: "1971"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Grab DOM elements
  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const nextButton = document.getElementById("next-button");
  const scoreText = document.getElementById("score-text");
  
  // Function to render a question and its answers
  function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = ''; // Clear previous answers
  
    currentQuestion.answers.forEach((answer, index) => {
      const answerRadio = document.createElement("input");
      answerRadio.type = "radio";
      answerRadio.name = "answer";
      answerRadio.value = answer;
      answerRadio.id = `answer${index}`;
      
      const answerLabel = document.createElement("label");
      answerLabel.setAttribute("for", `answer${index}`);
      answerLabel.textContent = answer;
  
      answersContainer.appendChild(answerRadio);
      answersContainer.appendChild(answerLabel);
      answersContainer.appendChild(document.createElement("br"));
    });
  }
  
  // Function to check if the selected answer is correct
  function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer && selectedAnswer.value === questions[currentQuestionIndex].correctAnswer) {
      score++;
    }
  }
  
  // Function to move to the next question
  function nextQuestion() {
    checkAnswer();
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      showFinalScore();
    }
  }
  
  // Function to show the final score
  function showFinalScore() {
    questionText.textContent = "Quiz Complete!";
    answersContainer.innerHTML = '';
    scoreText.textContent = `Final Score: ${score}/${questions.length}`;
    nextButton.textContent = "Restart";
    nextButton.removeEventListener('click', nextQuestion);
    nextButton.addEventListener('click', restartQuiz);
  }
  
  // Function to restart the quiz
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = `Score: 0`;
    nextButton.textContent = "Next";
    nextButton.removeEventListener('click', restartQuiz);
    nextButton.addEventListener('click', nextQuestion);
    renderQuestion();
  }
  
  // Initial rendering of the first question
  renderQuestion();
  
  // Set up the Next button functionality
  nextButton.addEventListener('click', nextQuestion);