Crafty.scene('Welcome', function () {
    Crafty.e('2D', 'DOM', 'Text')
        .text('<h1>Welcome to Snake-Reloaded</h1>' +
            '   <input type="text" id="name" name="name" placeholder="username">')
        .attr({ x: 0, y: 10, w: Game.width()})
        .bind('KeyDown', function (e) {
            if (e.key == Crafty.keys.ENTER) {
                HighScoreListService.gameData.setUsername(document.getElementById('name').value);
                Crafty.scene('Game');
            }
        })
});

Crafty.scene('Game', function () {
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
    HighScoreListService.saveScore(data.score);
    Crafty.e('2D, DOM, Text')
        .text('<h1>Game Over! Score: ' + data.score + '</h1>'
            + HighScoreListService.toString()
            + '<br> Press Any Key To Start A New Game')
        .attr({ x: 0, y: 10, w: Game.width() })
        .bind('KeyDown', function () {
            Crafty.scene('Game');
        })
});