class Game {
	constructor() {
		this.numOfPlayers = 0;
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

		// Winnig Combo of indexes to determine winner
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
		const player1 = new Player(
			prompt('Please enter a name for Player #1'),
			'X'
		);
		alert(`Player #1 (${player1.name}) has been created.`);

		let player2;

		if (this.numOfPlayers === '2') {
			player2 = new Player(
				prompt('Please enter a name for Player #2'),
				'O'
			);
			alert(`Player #2 (${player2.name}) has been created.`);
		} else {
			player2 = new Player('Mr. Computer', 'O');
		}

		alert(
			`Game on! \nIt's ${player1.name} ( '${player1.symbol}' ) vs ${player2.name} ( '${player2.symbol}' )`
		);

		let currentPlayer = player1;
		let currentClass = 'symb-x';
		gameArea.classList.add(currentClass);

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
				message.textContent = `${currentPlayer.name} Wins!`;

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
			message.textContent = `${currentPlayer.name}, your turn.`;
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
			message.textContent = `${currentPlayer.name}, your turn.`;
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
		}

		createBoard();
	}

	start(currentPlayer = this.player1) {
		this.numOfPlayers = prompt(
			`Number of Players: '1' (vs. Computer) or '2' (Head to Head)?`
		);

		switch (this.numOfPlayers) {
			case '1':
			case '2':
				game.createGame();
				break;
			case '':
				this.start();
				break;
			case null:
				window.close();
				break;
			default:
				alert(
					`Please enter a '1'  or '2' for number of players. To quit, hit 'Cancel' or 'Esc'.`
				);
				this.start();
				break;
		}
	}
}

class Player {
	constructor(name = 'Computer', symbol) {
		this.name = name;
		this.symbol = symbol;
		this.won = 0;
	}
}

// Create and start the game
const game = new Game();
game.start();
