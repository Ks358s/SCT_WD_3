const quizData = [
    {
        question: "Which language is used for web styling?",
        options: ["HTML", "CSS", "Python", "SQL"],
        correct: 1
    },
    {
        question: "What does UI stand for?",
        options: ["User Interval", "Unified Interface", "User Interface", "Unix Integration"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('answer-options');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');

function loadQuestion() {
    selectedAnswer = null;
    nextBtn.disabled = true;
    const data = quizData[currentQuestion];
    
    questionText.innerText = data.question;
    optionsContainer.innerHTML = "";
    
    data.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });

    progressBar.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
}

function selectOption(index, btn) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedAnswer = index;
    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    if (selectedAnswer === quizData[currentQuestion].correct) score++;
    
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    document.querySelector('.quiz-card').classList.add('hidden');
    const resultScreen = document.getElementById('result-screen');
    resultScreen.classList.remove('hidden');
    document.getElementById('final-score').innerText = `${score} / ${quizData.length}`;
}

loadQuestion();
