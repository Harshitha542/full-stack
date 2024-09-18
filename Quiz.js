const questions = [
    {
        question: "What is the purpose of the < img > tag in HTML?",
        answers: [
        { text: "To create a hyperlink", correct: false},
        { text: "To add an image to a webpage", correct: true},
        { text: "To format text", correct: false},
        { text: "To create a list", correct: false},
        ]
    },
    {
        question: "What is the difference between < b > and < strong > tags?",
        answers: [
        { text: "< b > is for bold text, < strong > is for italic text",correct: false},
        { text: "< b > is for bold text, < strong > is for important text",correct: true},
        { text: "< b > is for important text, < strong > is for bold text",correct: false},
        { text: "There is no difference",correct: false},
        ]
    },
    {
        question: "What does the < ul > tag represent?",
        answers: [
        { text: "Unordered list",correct: true},
        { text: "Ordered list",correct: false},
        { text: "Definition list",correct: false},
        { text: "Glossary list",correct: false},
        ]
    },
    {
        question: "How do you create a hyperlink in HTML?",
        answers: [
        { text: "< a >link< /a >",correct: false},
        { text: "< href >link< /href >",correct: false},
        { text: " < link >href< /link >",correct: false},
        { text: "< a href= 'url' >link< /a >",correct: true},
        ]
    },
    {
        question: "What does the < div > tag represent?",
        answers: [
        { text: "Definition",correct: false},
        { text: "Description",correct: false},
        { text: "Division",correct: true},
        { text: "Declaration",correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
     Array.from(answerButtons.children).forEach(button =>{
       if(button.dataset.correct === "true"){
        button.classList.add("correct");
       }
        button.disabled = true;
     });
     nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again ";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();