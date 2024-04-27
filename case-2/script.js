const questionElement = document.getElementById('question');
const choiceA = document.getElementById('choice-A');
const choiceB = document.getElementById('choice-B');
const choiceC = document.getElementById('choice-C');
const choiceD = document.getElementById('choice-D');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const answersTable = document.getElementById('answers');
const answersBody = document.getElementById('answers-body');
const questionNumberElement = document.getElementById('question-number');
const questionContainer = document.getElementById('question-container');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questions = [];

function getQuestions() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            data.slice(0, 10).forEach(item => {
                const choices = item.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));
                const correctChoiceIndex = Math.floor(Math.random() * 4);
                const correctChoice = String.fromCharCode(65 + correctChoiceIndex);

                questions.push({
                    question: `${item.title}?`,
                    choices: choices,
                    answer: correctChoice
                });
            });

            displayQuestion();
            startTimer();
        })
        .catch(error => console.error('Soruları alırken bir hata oluştu:', error));
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionNumberElement.textContent = `Soru ${currentQuestionIndex + 1}`;
    questionElement.textContent = currentQuestion.question;

    choiceA.textContent = `A) ${currentQuestion.choices[0]}`;
    choiceB.textContent = `B) ${currentQuestion.choices[1]}`;
    choiceC.textContent = `C) ${currentQuestion.choices[2]}`;
    choiceD.textContent = `D) ${currentQuestion.choices[3]}`;

    setTimeout(() => {
        enableChoices();
    }, 10000);
}

function enableChoices() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(button => {
        button.disabled = false;
    });
}

function selectAnswer(selectedChoice) {
    if (timeLeft < 21) {

        clearInterval(timerInterval);

        const currentQuestion = questions[currentQuestionIndex];
        const correctChoice = currentQuestion.answer;

        const userAnswer = selectedChoice ? selectedChoice : '';

        if (userAnswer === correctChoice) {
            score++;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
    <td>${currentQuestion.question}</td>
    <td>${userAnswer}</td>
    <td>${correctChoice}</td>
    `;
        answersBody.appendChild(tr);

        nextButton.classList.remove('hidden');
        timeLeft = 30;
        nextQuestion(selectedChoice);
    }
}

function nextQuestion(selectedChoice) {

    if (!selectedChoice) {

        const currentQuestion = questions[currentQuestionIndex];
        const correctChoice = currentQuestion.answer; 
        const tr = document.createElement('tr');
        tr.innerHTML = `
    <td>${currentQuestion.question}</td>
    <td>Boş</td>
    <td>${correctChoice}</td>
    `;
        answersBody.appendChild(tr);

        nextButton.classList.remove('hidden');
        timeLeft = 30;
        currentQuestionIndex++;
        document.querySelectorAll('.choice-btn').forEach(button => {
            button.style.backgroundColor = '#bec1c5';
        });
        timeLeft = 30;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            nextButton.classList.add('hidden');
            startTimer();
        } else {
            showScore();
        }
    } else {

        currentQuestionIndex++;
        document.querySelectorAll('.choice-btn').forEach(button => {
            button.style.backgroundColor = '#bec1c5';
        });
        timeLeft = 30;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            nextButton.classList.add('hidden');
            startTimer();
        } else {
            showScore();
        }

    }
}

function showScore() {
    questionElement.textContent = `Test tamamlandı! Puanınız: ${score}/${questions.length}`;
    nextButton.classList.add('hidden');
    clearInterval(timerInterval);
    answersTable.classList.remove('hidden');
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Süre: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            nextQuestion();


        } else if (timeLeft === 20) {
            document.querySelectorAll('.choice-btn').forEach(button => {
                button.style.backgroundColor = '#007bff';
            });
        }
    }, 1000);
}

getQuestions();

choiceA.addEventListener('click', () => selectAnswer('A'));
choiceB.addEventListener('click', () => selectAnswer('B'));
choiceC.addEventListener('click', () => selectAnswer('C'));
choiceD.addEventListener('click', () => selectAnswer('D'));
