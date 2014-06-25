function GameData(username, scoreList) {
    this.username = username;
    this.scoreList = scoreList
}

GameData.prototype.getUsername = function () {
    return this.username;
};

GameData.prototype.getScoreList = function () {
    return this.scoreList;
};

GameData.prototype.setScoreList = function (scoreList) {
    this.scoreList = scoreList;
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