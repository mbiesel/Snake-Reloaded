Crafty.scene('GameOver', function (data) {
    Crafty.e('DB').saveHighestScore(this.eaten);
	Crafty.e('2D, DOM, Text')
		.text('Game Over! Score: ' + data.score + '<br>Your highest score was: ' + Crafty.storage('highestScore'))
		.attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() });
});