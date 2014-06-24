$(document).ready(function(){

    // Initialisiere Canvas
    var field = $("#snake_field")[0];
    var ctx = field.getContext("2d");
    var w = $("#snake_field").width();
    var h = $("#snake_field").height();

    // Sonstige Variablen
    var cellwidth = 10;
    var direction;
    var snake;
    var food;
    var score;
    var gamespeed = 90;
    var gamePaused = false;
    var gameLost = false;
    var keypressed;
    $(".paused").hide();
    $(".lost").hide();

    // Initialisiere Game
    function init(){
        direction = "right"; // Rechts als Default Wert
        createSnake();
        createFood();
        score = 0;
        if(typeof loop != "undefined"){
            clearInterval(loop);
        }
        loop = setInterval(drawSnake, gamespeed);
    }
    init();

    function createSnake(){
        var start_length = 4;
        snake = [];

        for(var i = start_length - 1; i >= 0; i--){
            snake.push({
                x: i,
                y: 0
            });
        }
    }

    // Snake Food zeichnen
    function createFood(){
        food = {
            x: Math.round(Math.random()*(w-cellwidth)/cellwidth),
            y: Math.round(Math.random()*(h-cellwidth)/cellwidth)
        };

        while(collisionDetect(food.x, food.y, snake)){
            createFood();
        }
    }

    // Snake zeichnen
    function drawSnake(){

        keypressed = false;
        // Canvas Spielfeld zeichnen
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        var nx = snake[0].x;
        var ny = snake[0].y;

        // Bewegungsrichtungen
        if(direction == "right"){
            nx++;
        } else if(direction == "left"){
            nx--;
        } else if(direction == "up"){
            ny--;
        } else if(direction == "down"){
            ny++;
        }

        // Collision Detection mit dem Spielrand und sich selbst
        if(nx == -1 || nx == w/cellwidth || ny == -1 || ny == h/cellwidth || collisionDetect(nx, ny, snake)){
            gameLost = true;
            clearInterval(loop);
            $(".lost").show();
            return;
        }

        // Collision Detection mit Food
        if(nx == food.x && ny == food.y){
            var snake_tail = {
                x: nx,
                y: ny
            }
            score = score + 5;
            createFood();
        } else {
            var snake_tail = snake.pop(); // letzte Zelle entfernen
            snake_tail.x = nx;
            snake_tail.y = ny;
        }

        snake.unshift(snake_tail);

        for(var i = 0; i < snake.length; i++){
            var cell = snake[i];

            if(i == 0){
                ctx.fillStyle = "red";
                ctx.fillRect(cell.x*cellwidth, cell.y*cellwidth, cellwidth, cellwidth);
                ctx.strokeStyle = "white";
                ctx.strokeRect(cell.x*cellwidth, cell.y*cellwidth, cellwidth, cellwidth);
            } else {
                ctx.fillStyle = "green";
                ctx.fillRect(cell.x*cellwidth, cell.y*cellwidth, cellwidth, cellwidth);
                ctx.strokeStyle = "white";
                ctx.strokeRect(cell.x*cellwidth, cell.y*cellwidth, cellwidth, cellwidth);
            }

        }

        // Snake Food zeichnen
        drawFood(food.x, food.y);
        $("#score").text("SCORE: " + score);
    }

    // Zellen zeichnen
    function drawFood(x, y){
        ctx.fillStyle = "blue";
        ctx.fillRect(x*cellwidth, y*cellwidth, cellwidth, cellwidth);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x*cellwidth, y*cellwidth, cellwidth, cellwidth);
    }

    // Collision Detection mit sich selbst
    function collisionDetect(x, y, array){
        for(var i = 0; i < array.length; i++){
            if(array[i].x == x && array[i].y == y){
                return true;
            }
        }
        return false;
    }

    // Keyboard Control
    $(document).keydown(function(e){

        var key = e.which;
        if(key == "37" && direction != "right" && keypressed == false){
            keypressed = true;
            direction = "left";
        } else if(key == "38" && direction != "down" && keypressed == false){
            keypressed = true;
            direction = "up";
        } else if(key == "39" && direction != "left" && keypressed == false){
            keypressed = true;
            direction = "right";
        } else if(key == "40" && direction != "up" && keypressed == false){
            keypressed = true;
            direction = "down";
        } else if (key == "32"&& gameLost == false) {
            pauseGame();
        } else if (key == "13" && gameLost == true) {
            gameLost = false;
            $(".lost").hide();
            init();
        }


    })

    function pauseGame(){
        if(gamePaused){
            loop = setInterval(drawSnake, gamespeed);
            gamePaused = false;
            $(".paused").hide();
        } else {
            clearInterval(loop);
            gamePaused = true;
            $(".paused").show();
        }
    }



});