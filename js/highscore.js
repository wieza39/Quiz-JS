const leaderName = Array.from(document.querySelectorAll(".highscoreName"));
const leaderScore = Array.from(document.querySelectorAll(".highscorePoints"));
let newLeader = JSON.parse(localStorage.getItem("leader")) || {};
let savedLeaderBoard = JSON.parse(localStorage.getItem("leaderBoardAddon"));

let leaderBoard = [
	{
		playerName: "Syn kolezanki mamy",
		playerScore: 1000000,
	},

	{
		playerName: "Andrzej",
		playerScore: 10,
	},

	{
		playerName: "Anna",
		playerScore: 5,
	},

	{
		playerName: "NoName",
		playerScore: 70,
	},

	{
		playerName: "ostatni",
		playerScore: 1,
	},
];

sortingLeaderBoard = (leaderBoard) => {
	leaderBoard.sort((a, b) => b.playerScore - a.playerScore);
};
debugger;
setLeaderOnList = () => {

	leaderBoard.push(...savedLeaderBoard);
	savedLeaderBoard = [];
	localStorage.setItem("leaderBoardAddon", JSON.stringify(savedLeaderBoard));
	sortingLeaderBoard(leaderBoard);
	leaderBoard.slice(0, 5);

	for (let i = 0; i < 5; i++) {
		leaderName[i].innerText = leaderBoard[i].playerName;
		leaderScore[i].innerText = leaderBoard[i].playerScore;
	}
};

setLeaderOnList();
