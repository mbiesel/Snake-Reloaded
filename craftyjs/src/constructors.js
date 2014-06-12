function GameData(scoreList) {
    this.username = '';
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
    if (score) {
        this.username = username;
        this.score = score;
    } else {
        this.username = username.username;
        this.score = username.score;
    }
}