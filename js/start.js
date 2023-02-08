addName = () => {
	let playerName = document.getElementById("player-name").value;
	localStorage.setItem("player", playerName);
};
