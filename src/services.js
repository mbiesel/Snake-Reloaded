const FILE_NAME = "Snake-Reloaded-HighScoreList";

HighScoreListService = {
    gameData: null,

    // init the highScore list
    init: function () {
        var list;
        if (Crafty.storage(FILE_NAME)) {
            list = Crafty.storage(FILE_NAME);
        } else {
            var scoreList = [9];
            for (var i = 0; i < 10; i++) {
                scoreList[i] = new HighScoreItem(null, null);
            }
            list = scoreList;
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

    // whole highScore to string, to see all scores for the game over scene
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

function GameData(scoreList) {
    this.username = null;
    this.scoreList = scoreList
}

GameData.prototype.getUsername = function () {
    return this.username;
};

GameData.prototype.setUsername = function (username) {
    this.username = username;
};

GameData.prototype.getScoreList = function () {
    return this.scoreList;
};

GameData.prototype.setScoreList = function (username) {
    this.scoreList = username;
};

function HighScoreItem(username, score) {
    this.username = username;
    this.score = score;
}