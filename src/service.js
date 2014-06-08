HighScoreListService = {
    data: {
        FILE_NAME: "Snake-Reloaded-HighScoreList",
        username: null,
        scoreList: []
    },

    setUsername: function (username) {
        if (!this.data.username) {
            this.data.username = username;
        }
    },

    getUsername: function () {
        return this.data.username;
    },

    setScoreList: function (scoreList) {
        this.data.scoreList = scoreList;
    },

    getScoreList: function () {
        return this.data.scoreList;
    },

    init: function () {
        if (Crafty.storage(this.data.FILE_NAME)) {
            this.setScoreList(Crafty.storage(this.data.FILE_NAME));
        } else {
            var scoreList = [9];
            for (var i = 0; i < 10; i++) {
                scoreList[i] = new HighScoreItem(null, null);
            }
            this.setScoreList(scoreList);
        }
    },

    saveScore: function (score) {
        var scoreList = this.getScoreList();
        for (var i = 0; i < 10; i++) {
            if (score > scoreList[i].score) {
                for (var j = 9; j > i; j--) {
                    scoreList[j] = scoreList[j - 1]
                }
                scoreList[i] = new HighScoreItem(this.getUsername(), score);
                break;
            }
        }
        this.setScoreList(scoreList);
        Crafty.storage(this.data.FILE_NAME, scoreList);
    },

    toString: function () {
        var scoreList = this.getScoreList(),
            ret = '';

        for (var i = 0; i < 10; i++) {
            if (scoreList[i].score) {
                ret += '<h2>' + (i + 1) + ': ' + scoreList[i].score + ' ' + scoreList[i].username + '</h2>'
            }
        }
        return ret;
    }
};

function HighScoreItem(username, score) {
    this.username = username;
    this.score = score;
}

