Crafty.scene('Game', function(){
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

            if (at_edge) {
                Crafty.e('Wall').at(x, y);
            }
        }
    }

    Crafty.e('SnakeHead').at(5, 5);
    Crafty.e('Food').at(5, 10);
});

Crafty.scene('GameOver', function (data) {
    Game.saveHighestScore(data.score);
	Crafty.e('2D, DOM, Text')
		.text('Game Over! Score: ' + data.score + '<br>Your Highest Score Was: ' + Crafty.storage('highestScore')
    + '<br> Press Any Key To Start A New Game')
		.attr({ x: 0, y: Game.height() / 2 - 24, w: Game.width() })
        .bind('KeyDown', function(){
            Crafty.scene('Game');
        })
});