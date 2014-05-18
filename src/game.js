Game = {
    map_grid: {
        width: 48,
        height: 24,
        tile: {
            width:  16,
            height: 16
        }
    },

    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    start: function() {
        Crafty.init(Game.width(), Game.height());
        Crafty.background('white');

        for (var x = 0; x < Game.map_grid.width; x++) {
            for (var y = 0; y < Game.map_grid.height; y++) {
                var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

                if (at_edge) {
                    Crafty.e('Wall').at(x, y);
                }
            }
        }

        Crafty.e('SnakeHead').at(5,5);
        Crafty.e('Food').at(5,10);
    }
};