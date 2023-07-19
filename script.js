class Game {
	constructor() {
		let numOfPlayers = 2;
	}

	createGame() {
		const gameArea = document.querySelector('#gameArea');
		const p1Player = document.querySelector('#p1Player');
		const p2Player = document.querySelector('#p2Player');
		const p1Score = document.querySelector('#p1Score');
		const p2Score = document.querySelector('#p2Score');
		const nextPlayer = document.querySelector('#nextPlayer');

		const player1 = new Player('De Sean');
		const player2 = new Player('Computer');
		let currentPlayer = player1;
		gameArea.classList.add('symbX');
		let player1won = 1;
		let player2won = 0;

		p1Player.textContent = `${player1.name}: `;
		p1Score.textContent = player1won;

		p2Player.textContent = `${player2.name}: `;
		p2Score.textContent = player2won;

		message.textContent = 'In-game messages goes here...';

		const blocks = ['', '', '', '', '', '', '', '', ''];

		const handleBlockClick = e => {
			e.preventDefault();

			if (currentPlayer === player1) {
				e.target.classList.add('symbX');
			} else {
				e.target.classList.add('symbO');
			}

			// Get a reference to the clicked element
			const thisBlock = document.getElementById(e.target.id);

			// Remove the click event from the element
			thisBlock.removeEventListener('click', handleBlockClick);

			switchPlayers(player1, player2);
		};

		// Switch the current player
		function switchPlayers(player1, player2) {
			if (currentPlayer === player1) {
				gameArea.classList.remove('symbX');
				gameArea.classList.add('symbO');
				currentPlayer = player2;
			} else {
				gameArea.classList.add('symbX');
				gameArea.classList.remove('symbO');
				currentPlayer = player1;
			}

			message.textContent = `Next up: ${currentPlayer.name}`;
		}

		function createBoard() {
			blocks.forEach((_, idx) => {
				const block = document.createElement('div');

				block.classList.add('square');
				block.id = idx + 1;

				if (idx === 0 || idx === 1 || idx === 2)
					block.style.borderTop = 'none';
				if (idx === 0 || idx === 3 || idx === 6)
					block.style.borderLeft = 'none';

				if (idx === 2 || idx === 5 || idx === 8)
					block.style.borderRight = 'none';

				if (idx === 6 || idx === 7 || idx === 8)
					block.style.borderBottom = 'none';

				block.addEventListener('click', handleBlockClick);

				gameArea.append(block);
			});

			nextPlayer.textContent = `${currentPlayer.name}`;

			console.log(message);

			game.start(currentPlayer);
		}

		createBoard();
	}

	start(currentPlayer) {
		message.textContent = `Next up: ${currentPlayer.name}`;

		console.log(message);
	}
}

class Player {
	constructor(name = 'Computer') {
		this.name = name;
	}
}

// Create and start the game
const game = new Game();
game.createGame();
