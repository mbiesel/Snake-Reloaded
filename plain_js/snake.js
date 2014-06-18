/**
 * @author Ky
 */
window.onload = function() {
	var active = true;
	var body = document.getElementsByTagName('body')[0];
	var canvas = document.createElement('canvas');
	var direction = 0;
	var gameMatrix = new Array(20);
	var level = 0;
	var score = 0;
	var snake = new Array(3);
	var speed = 100;

	//20*15 Felder mit jeweils 15px/Feld
	canvas.width = 302;
	canvas.height = 227;

	for (var i = 0; i < gameMatrix.length; i++) {
		gameMatrix[i] = new Array(15);
	}

	gameArea = canvas.getContext('2d');

	body.appendChild(canvas);

	gameMatrix = generateRandomDot(gameMatrix);
	gameMatrix = generateSnake(gameMatrix);
	startSnake();

	window.addEventListener('keydown', function(e) {
		if (e.keyCode === 38 && direction !== 3) {
			direction = 2;
			// Hoch
		} else if (e.keyCode === 40 && direction !== 2) {
			direction = 3;
			// Runter
		} else if (e.keyCode === 37 && direction !== 0) {
			direction = 1;
			// Links
		} else if (e.keyCode === 39 && direction !== 1) {
			direction = 0;
			// Rechts
		}
	});

	function startSnake() {
		gameArea.clearRect(0, 0, canvas.width, canvas.height);
		drawGameArea();

		for (var i = snake.length - 1; i >= 0; i--) {
			if (i === 0) {
				switch(direction) {
					case 0:
						// Rechts
						snake[0] = {
							x : snake[0].x + 1,
							y : snake[0].y
						}
						break;
					case 1:
						// Links
						snake[0] = {
							x : snake[0].x - 1,
							y : snake[0].y
						}
						break;
					case 2:
						// Hoch
						snake[0] = {
							x : snake[0].x,
							y : snake[0].y - 1
						}
						break;
					case 3:
						// Runter
						snake[0] = {
							x : snake[0].x,
							y : snake[0].y + 1
						}
						break;
				}

				// Überprüfung, ob die Schlange den Rand "isst" und gibt dann ein Game Over aus 
				if (snake[0].x < 0 || snake[0].x >= 20 || snake[0].y < 0 || snake[0].y >= 15) {
					showGameOver();
					return;
				}

				// Wenn die Schlange etwas isst, soll der Score hochgezählt werden,
				// einen neuen Futterpunkt generieren und
				// die schlange verlängern.
				if (gameMatrix[snake[0].x][snake[0].y] === 1) {
					score += 10;
					gameMatrix = generateRandomDot(gameMatrix);

					// Verlängern der Schlange
					snake.push({
						x : snake[snake.length - 1].x,
						y : snake[snake.length - 1].y
					});
					gameMatrix[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;

					// Bei allen Score-Zahlen durch Hundert wird das Level hochgesetzt
					if ((score % 100) == 0) {
						level += 1;
					}

					// Wenn man sich selber frisst, ist das Spiel ebenfalls beendet
				} else if (gameMatrix[snake[0].x][snake[0].y] === 2) {
					showGameOver();
					return;
				}

				gameMatrix[snake[0].x][snake[0].y] = 2;
			} else {
				// Das Array der Schlange wandert mit, somit muss das letzte Element gelöscht werden,
				// weil die "Punkte" nachrücken
				if (i === (snake.length - 1)) {
					gameMatrix[snake[i].x][snake[i].y] = null;
				}

				snake[i] = {
					x : snake[i - 1].x,
					y : snake[i - 1].y
				};
				gameMatrix[snake[i].x][snake[i].y] = 2;
			}
		}

		// Malt die Schlange und den zufällig generierten Punkt für das gesamte Array
		for (var x = 0; x < gameMatrix.length; x++) {
			for (var y = 0; y < gameMatrix[0].length; y++) {
				if (gameMatrix[x][y] === 1) {
					gameArea.fillStyle = '#000';
					gameArea.fillRect(x * 15, y * 15, 15, 15);
				} else if (gameMatrix[x][y] === 2) {
					gameArea.fillStyle = '#aaa';
					gameArea.fillRect(x * 15, y * 15, 15, 15);
				}
			}
		}

		if (active) {
			setTimeout(startSnake, speed - (level * 50));
		}
	}
	
	//Zeichnet das Spielfeld
	function drawGameArea() {
		gameArea.lineWidth = 1;
		gameArea.strokeStyle = '#000';
		gameArea.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
	}

	//Lässt zufällig "Futter erscheinen"
	function generateRandomDot(gameMatrix) {
		var randomX = Math.round(Math.random() * 19);
		var randomY = Math.round(Math.random() * 14);

		while (gameMatrix[randomX][randomY] === 2) {
			randomX = Math.round(Math.random() * 19);
			randomY = Math.round(Math.random() * 14);
		}

		gameMatrix[randomX][randomY] = 1;

		return gameMatrix;
	}
	
	// Die Schlange wird zufällig auf der Karte erstellt
	function generateSnake(gameMatrix) {
		var randomX = Math.round(Math.random() * 19);
		var randomY = Math.round(Math.random() * 14);

		while ((randomX - snake.length) < 0) {
			randomX = Math.round(Math.random() * 19);
		}

		for (var i = 0; i < snake.length; i++) {
			snake[i] = {
				x : randomX - i,
				y : randomY
			};
			gameMatrix[randomX - i][randomY] = 2;
		}

		return gameMatrix;
	}

	function showGameOver() {
		alert('GAME OVER\nYour score is ' + score);
	}

}; 
