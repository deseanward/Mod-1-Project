class Game {
	constructor() {
		let numOfPlayers = 2;
		const player1 = new Player('De Sean');
		const player2 = new Player();
	}

	createGame() {
		const gameArea = document.querySelector('#gameArea');
		const p1Score = document.querySelector('#p1Score');
		const p2Score = document.querySelector('#p2Score');
		const message = document.querySelector('#message');

		let player1won = 1;
		let player2won = 0;

		p1Score.textContent = player1won;
		p2Score.textContent = player2won;
		message.textContent = 'In-game messages goes here...';

		const blocks = ['', '', '', '', '', '', '', '', ''];

		function createBoard() {
			blocks.forEach((_, idx) => {
				const block = document.createElement('div');

				block.classList.add('square');
				block.classList.add('symbX');
				block.classList.add('symbO');
				block.id = idx + 1;

				if (idx === 0 || idx === 1 || idx === 2)
					block.style.borderTop = 'none';
				if (idx === 0 || idx === 3 || idx === 6)
					block.style.borderLeft = 'none';

				if (idx === 2 || idx === 5 || idx === 8)
					block.style.borderRight = 'none';

				if (idx === 6 || idx === 7 || idx === 8)
					block.style.borderBottom = 'none';

				gameArea.append(block);
			});
		}

		createBoard();
	}
}

class Player {
	constructor(name) {
		this.name = name;
	}
}

// Create and start the game
const game = new Game();
game.createGame();
