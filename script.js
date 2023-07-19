class Game {
	constructor() {
		let numOfPlayers = 2;
	}

	createGame() {
		// Accessing the DOM elements
		const gameArea = document.querySelector('#game-area');
		const p1Name = document.querySelector('#p1-player');
		const p2Name = document.querySelector('#p2-player');
		const p1Score = document.querySelector('#p1-score');
		const p2Score = document.querySelector('#p2-score');
		const nextPlayer = document.querySelector('#next-player');
		const resetButton = document.querySelector('#reset-btn');

		const winningCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		// Instantiate the players
		const player1 = new Player('De Sean');
		const player2 = new Player('Computer');
		let currentPlayer = player1;
		let currentClass = 'symb-x';
		gameArea.classList.add(currentClass);
		let player1won;
		let player2won;

		p1Name.textContent = `${player1.name}: `;
		p1Score.textContent = `${player1.won}`;

		p2Name.textContent = `${player2.name}: `;
		p2Score.textContent = `${player2.won}`;

		// Status Message
		nextPlayer.textContent = `${currentPlayer.name}`;

		// Handling of the block's click evenet
		const handleBlockClick = e => {
			e.preventDefault();

			const block = e.target;

			// Checks for the current player and places the appropriate symbol
			currentPlayer === player1
				? (currentClass = 'symb-x')
				: (currentClass = 'symb-o');

			block.classList.add(currentClass);

			// Check for winner
			if (checkIfWon(currentClass)) {
				message.textContent = `Winner: ${currentPlayer.name}!`;

				currentPlayer.won++;

				switch (currentPlayer) {
					case player1:
						p1Score.textContent = player1.won;
						break;
					case player2:
						p2Score.textContent = player2.won;
						break;
					default:
						return;
				}
			} else {
				// If no winner, switch players
				switchPlayers(player1, player2);
			}
		};

		//
		// Handling of the reset button's click event
		const handleResetBtn = e => {
			e.preventDefault();

			const allBlocks = document.querySelectorAll('.square');

			allBlocks.forEach(block => {
				gameArea.removeChild(block);
			});

			const allXs = document.querySelectorAll('.symb-x');
			const allOs = document.querySelectorAll('.symb-o');

			allXs.forEach(x => {
				x.classList.remove('symb-x');
			});

			allOs.forEach(o => {
				o.classList.remove('symb-o');
			});

			//
			currentPlayer = player1;
			gameArea.classList.add('symb-x');
			message.textContent = `Next up: ${currentPlayer.name}`;
			createBoard();
		};

		// Check for winner
		function checkIfWon(currentClass) {
			const allBlocks = document.querySelectorAll('.square');

			return winningCombos.some(combo => {
				return combo.every(idx => {
					return allBlocks[idx].classList.contains(currentClass);
				});
			});
		}

		// Switch the current player
		function switchPlayers(player1, player2) {
			// Remove the current class associated with the current player
			gameArea.classList.remove(currentClass);

			// Update the current player and current class
			if (currentPlayer === player1) {
				currentClass = 'symb-o';
				currentPlayer = player2;
			} else {
				currentClass = 'symb-x';
				currentPlayer = player1;
			}

			// Update class reference of the updated current user to the game
			gameArea.classList.add(currentClass);

			// Update Next Up message
			message.textContent = `Next up: ${currentPlayer.name}`;
		}

		// Initialize the game board
		function createBoard() {
			for (let idx = 0; idx < 9; idx++) {
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

				// Add click event listener
				block.addEventListener('click', handleBlockClick, {
					once: true,
				});

				gameArea.append(block);
			}

			resetButton.addEventListener('click', handleResetBtn);

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
		this.won = 0;
	}
}

// Create and start the game
const game = new Game();
game.createGame();
