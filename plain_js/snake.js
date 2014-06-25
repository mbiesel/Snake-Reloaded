/**
 * @author Luong, Heidelberg
 */
window.onload = function() {
	var active = false;
	var canvas = document.getElementById('canvas');
    var gameArea = canvas.getContext('2d');
    var field_html = document.getElementById('field');
    var level_html = document.getElementById('level');
    var score_html = document.getElementById('score');
    var highscore_html = document.getElementById('highscore');
	var direction = 0;
	var gameMatrix = new Array(20);
	var level = 1;
	var score = 0;
	var snake = new Array(3);
	var speed = 100;
    localStorage.clear('highscoreList');
    var highscoreList = JSON.parse(localStorage.getItem('highscoreList'));

    if(highscoreList === null) {
        createHighscore();
    }

    highscore_html.onclick = showHighscore;
    level_html.value = level;
    score_html.value = score;

    //width=300px, height=225px => 20*15 Felder mit jeweils 15px/Feld
	for (var i = 0; i < gameMatrix.length; i++) {
		gameMatrix[i] = new Array(15);
	}

	gameMatrix = generateRandomDot(gameMatrix);
	gameMatrix = generateSnake(gameMatrix);
    runSnake();

	window.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            // Esc to pause
            case 27 :   if(active === true) {
                            active = false;
                            runSnake();
                        }
                        break;

            /*  0 => right
                1 => left
                2 => up
                3 => down  */

            // Up to up
            case 38 :   if(direction !== 3){
                            direction = 2;
                            if (active === false) {
                                active = true;
                                runSnake();
                            }
                        }
                        break;
            // Down to down
            case 40 :   if(direction !== 2){
                            direction = 3;
                            if (active === false) {
                                active = true;
                                runSnake();
                            }
                        }
                        break;
            // Left to left
            case 37 :   if(direction !== 0){
                            direction = 1;
                            if (active === false) {
                                active = true;
                                runSnake();
                            }
                        }
                        break;
            // Right to right
            case 39 :   if(direction !== 1){
                            direction = 0;
                            if (active === false) {
                                active = true;
                                runSnake();
                            }
                        }
                        break;
        }
	});

	function runSnake() {
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
					score += 10*level;
                    score_html.value = score;
					gameMatrix = generateRandomDot(gameMatrix);

					// Verlängern der Schlange
					snake.push({
						x : snake[snake.length - 1].x,
						y : snake[snake.length - 1].y
					});
					gameMatrix[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;

					// Bei allen Score-Zahlen durch 50 wird das Level und der Speed hochgesetzt
					if ((score % 50) == 0) {
						level += 1;
                        level_html.value = level;
                        if(speed > 20) {
                            speed -= 10;
                        }
					}

					// Wenn man sich selber frisst, ist das Spiel ebenfalls beendet
				} else if (gameMatrix[snake[0].x][snake[0].y] === 2) {
					showGameOver();
					return;
				}

				gameMatrix[snake[0].x][snake[0].y] = 3;
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
					gameArea.fillStyle = '#00F';
					gameArea.fillRect(x * 15, y * 15, 15, 15);
				} else if (gameMatrix[x][y] === 2) {
					gameArea.fillStyle = '#aaa';
					gameArea.fillRect(x * 15, y * 15, 15, 15);
				} else if (gameMatrix[x][y] === 3) {
                    gameArea.fillStyle = '#000';
                    gameArea.fillRect(x * 15, y * 15, 15, 15);
                }
			}
		}

		if (active) {
			setTimeout(runSnake, speed);
		}
	}
	
	// Zeichnet das Spielfeld
	function drawGameArea() {
		gameArea.lineWidth = 1;
		gameArea.strokeStyle = '#000';
		gameArea.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
	}

	// Lässt zufällig "Futter" erscheinen
	function generateRandomDot(gameMatrix) {
		var randomX = Math.round(Math.random() * 19);
		var randomY = Math.round(Math.random() * 14);

        // 2 bedeutet, dass das Feld von der Schlange belegt wird
		while (gameMatrix[randomX][randomY] === 2) {
			randomX = Math.round(Math.random() * 19);
			randomY = Math.round(Math.random() * 14);
		}

        // Feld wird als Futter markiert
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

    // Erstellt Dummy-Highscore wenn noch keiner existiert
    function createHighscore() {
        highscoreList = new Array(5);
        highscoreList[0] = {name: 'Matthias', score: 1400};
        highscoreList[1] = {name: 'Tim', score: 990};
        highscoreList[2] = {name: 'Sebastian', score: 990};
        highscoreList[3] = {name: 'Rudi', score: 790};
        highscoreList[4] = {name: 'Beni', score: 730};
    }

    // Zeigt Highscore an
    function showHighscore() {
        var highscoreString = 'Highscore:\n\n';
        for(var i=0; i<=4; i++) {
            highscoreString += i+1 + '. ' + highscoreList[i].name + '   ' + highscoreList[i].score + '\n';
        }
        alert(highscoreString);

  /*      for(var i=1; i<=5; i++) {
            document.getElementById('_'+i+'-1').innerHTML = i.toString() + '. ' + highscoreList[i-1].name;
            document.getElementById('_'+i+'-2').innerHTML = highscoreList[i-1].score;
        }   */
    }

    // Zeigt Ende des Spiels an und speichert neuen Highscore geordnet
    function showGameOver() {
        if(score > highscoreList[4].score) {
            var name = prompt('New Highscore!!!\n\nEnter your name:');
            if(name === null) {
                name = 'Unknown';
            }
            highscoreList[4] = {name: name, score: score};
            highscoreList.sort(function(a, b){
                return b.score- a.score;
            });
            localStorage.setItem('highscoreList', JSON.stringify(highscoreList));
        }
        else {
            alert('Game Over!');
        }
    }
};

