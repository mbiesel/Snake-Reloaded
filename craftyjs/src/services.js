const FILE_NAME = "Snake-Reloaded-HighScoreList";

HighScoreListService = {
    gameData: null,

    // init the highScore list
    init: function () {
        var list = new Array(10);
        if (Crafty.storage(FILE_NAME)) {
            list = Crafty.storage(FILE_NAME);
            list.forEach(function (value, key) {
                list[key] = new HighScoreItem(value)
            });
        } else {
            list = Config.initHighScoreList();
        }
        this.gameData = new GameData(list);
    },

    // save a new score
    saveScore: function (score) {
        var scoreList = this.gameData.getScoreList();
        for (var i = 0; i < 10; i++) {
            if (score > scoreList[i].score) {
                for (var j = 9; j > i; j--) {
                    scoreList[j] = scoreList[j - 1]
                }
                scoreList[i] = new HighScoreItem(this.gameData.getUsername(), score);
                break;
            }
        }
        this.gameData.setScoreList(scoreList);
        Crafty.storage(FILE_NAME, scoreList);
    },

    // whole highScoreList to string, to see all scores for the game over scene
    toString: function () {
        var scoreList = this.gameData.getScoreList(),
            ret = '';

        for (var i = 0; i < 10; i++) {
            if (scoreList[i].score) {
                ret += '<h2>' + (i + 1) + ': ' + scoreList[i].score + ' ' + scoreList[i].username + '</h2>'
            }
        }
        return ret;
    }
};