	export const getResults = () => {
		const gameResults = localStorage.getItem('gameResults');
		if (!gameResults) {
			return []; 
			}
		return JSON.parse(gameResults);
	};

	export const updateResults =  (gameResults) => {
		localStorage.setItem('gameResults', JSON.stringify(gameResults));
	};

	export const saveResults = (gameResult) => {
		const gameResults = getResults();
		gameResults.push(gameResult);
		updateResults(gameResults);
	};