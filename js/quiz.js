const question = document.querySelector("#question");
const answers = Array.from(document.querySelectorAll(".answer-btn"));
const scoreText = document.querySelector("#current-score");
const timer = document.querySelector("#timer-bar");
let playerNameElement = document.querySelector("#player-name");
let savedPlayerName = localStorage.getItem("player");

let currentQuestion = {};
let correctAnswer = true;
let score = 0;
let questionCounter = 0;
let questionsLeft = [];

let timeBar;


let questions = [
	{
		category: "single",
		question: "This is first question?",
		answer1: "answer 1",
		answer2: "answer 2",
		answer3: "answer 3",
		answer4: "answer 4",
		correct: 1,
	},

	{
		category: "bool",
		question: "This is true question?",
		answer1: "True",
		answer2: "False",
		correct: 1,
	},

	{
		category: "single",
		question: "This is third question?",
		answer1: "answer 1",
		answer2: "answer 2",
		answer3: "answer 3",
		answer4: "answer 4",
		correct: 3,
	},
];

const points = 50;
const allQuestions = questions.length;

//game setup
newGame = () => {
	score = 0;
	questionCounter = 0;
	questionsLeft = [...questions];
	getNextQuestion();
	displayName();
};

getNextQuestion = () => {
	clearTimeout(timeBar);
	if (questionsLeft.length === 0 || questionCounter > allQuestions) {
		localStorage.setItem("lastScore", score);
		return window.location.assign("end.html");
	}

	questionCounter++;
	//reset timer
	timerRestart();
	
	startTimer();

	//getting and displaying random question
	const questionIndex = Math.floor(Math.random() * questionsLeft.length);
	currentQuestion = questionsLeft[questionIndex];
	question.innerText = currentQuestion.question;

	//condition for type of question

	//displaying answers on buttons
	answers.forEach((choice) => {
		const number = choice.dataset["number"];
		choice.innerText = currentQuestion["answer" + number];

		if (currentQuestion.category == "bool") {
			answers[2].style.visibility = "hidden";
			answers[3].style.visibility = "hidden";
		} else {
			answers[2].style.visibility = "visible";
			answers[3].style.visibility = "visible";
		}
	});
	//delete used question
	questionsLeft.splice(questionIndex, 1);

	correctAnswer = true;
};

//action for clicked answer
answers.forEach((choice) => {
	choice.addEventListener("click", (e) => {
		//stop timer
		timer.style.animationPlayState = "paused";

		if (!correctAnswer) return;

		correctAnswer = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];

		let classToApply =
			selectedAnswer == currentQuestion.correct
				? "chosen-correct"
				: "chosen-incorrect";

		if (classToApply === "chosen-correct") {
			incrementScore(points);
		} else decrementScore(points);

		selectedChoice.classList.add(classToApply);
		clearTimeout(timeBar);
		
		setTimeout(() => {
			selectedChoice.classList.remove(classToApply);
			getNextQuestion();
		}, 1000);
	});
});

incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
};

decrementScore = (num) => {
	score -= num / 2;
	scoreText.innerText = score;
};

displayName = () => {
	playerNameElement.innerText = savedPlayerName;
};

timerRestart = () => {
	timer.style.animation = "none";
	timer.offsetWidth;
	timer.style.animation =
		"roundtime calc(var(--duration) * 1s) linear forwards";
	timer.style.animationPlayState = "running";
};

startTimer = () => {
	timeBar = window.setTimeout(() => {
		localStorage.setItem("lastScore", score);
		return window.location.assign("end.html");
	}, 5000 );
}

questionDrawing = (questionNumber) => {

}

newGame();