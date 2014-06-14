Game = {
    map_grid: {
        width: 48,
        height: 24,
        tile: {
            width: 16,
            height: 16
        }
    },

    width: function () {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    height: function () {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    start: function () {
        HighScoreListService.init();
        Crafty.init(Game.width(), Game.height());
        Crafty.background('white');

        Crafty.scene('Welcome');
    }
};