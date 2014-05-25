var username,
    scoreList = [];

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

    saveHighestScore: function (score) {
        var scoreItem = {
            score: score,
            username: username
        };

        for (i = 0; i < 10; i++) {
            if (scoreList[i] == undefined || score > scoreList[i].score) {
                for (j = 10; j > i; j--) {
                    scoreList[j] = scoreList[j - 1]
                }
                scoreList[i] = scoreItem;
                break;
            }

        }
        Crafty.storage('highScoreList', scoreList);
    },

    start: function () {
        if (Crafty.storage('highScoreList')) {
            scoreList = Crafty.storage('highScoreList');
        }
        Crafty.init(Game.width(), Game.height());
        Crafty.background('white');

        Crafty.scene('Welcome');
    }
};