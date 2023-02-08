let playerNameElement = document.querySelector("#nameLoad");
let savedPlayerName = localStorage.getItem("player");
let scoreElement = document.querySelector("#scoreLoad");
let savedScore = localStorage.getItem("lastScore");
let savedLeaderBoard =
	JSON.parse(localStorage.getItem("leaderBoardAddon")) || [];

playerNameElement.innerText = savedPlayerName;
scoreElement.innerText = savedScore;

addNewLeader = () => {
	const leader = {
		playerName: savedPlayerName,
		playerScore: savedScore,
	};
	savedLeaderBoard.push(leader);

	localStorage.setItem("leaderBoardAddon", JSON.stringify(savedLeaderBoard));
};

addNewLeader();