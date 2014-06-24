Crafty.c('Grid', {
	init: function () {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		})
	},

	at: function (x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x / Game.map_grid.tile.width, y: this.y / Game.map_grid.tile.height }
		} else {
			this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
			return this;
		}
	}

});

Crafty.c('Actor', {
	init: function () {
		this.requires('2D, Canvas, Grid');
	}
});

Crafty.c('Wall', {
	init: function () {
		this.requires('Actor, Color, Solid')
			.color('grey');
	}
});

Crafty.c('Food', {
	init: function () {
		this.requires('Actor, Color')
			.color('black');
	}
});

Crafty.c('SnakeCell', {
	init: function () {
		this.requires('Actor, Color, Solid')
			.color('green');
	}
});

Crafty.c('SnakeHead', {
    startingLength: 2,
	speed: 300,
	eaten: 0,
	direction: "s",
	init: function () {
		this.positions = [];
		this.cells = [];
		this.requires('Actor, Color, Keyboard, Collision')
			.color('green')
			.bind('KeyDown', function () {

				if (this.isDown('W') && this.direction != "s") {
					this.direction = "n";
				}
				else if (this.isDown('A') && this.direction != "e") {
					this.direction = "w";
				}
				else if (this.isDown('S') && this.direction != "n") {
					this.direction = "s";
				}
				else if (this.isDown('D') && this.direction != "w") {
					this.direction = "e";
				}


			})
			.moveSnake()
			.collide()
			.eat();

	},

	moveSnake: function () {
		this.reduceInterval(1);

		return this;
	},

	collide: function () {
		this.onHit('Solid', function () {
			this.reduceInterval(0);
			Crafty.scene("GameOver", {score: this.eaten});
		});

		return this;
	},

	eat: function () {
		this.onHit('Food', function (data) {
			var food = data[0].obj;
			food.destroy();
			this.reduceInterval(0.95);
			this.eaten++;
			setTimeout(function () {
				Crafty.e('Food').at(Game.randomIntFromInterval(1, Game.map_grid.width - 2),
					Game.randomIntFromInterval(1, Game.map_grid.height - 2))
			}, this.speed)
		});

		return this;
	},

	reduceInterval: function (reduction) {
		clearInterval(this.interval);
		if (reduction > 0) {

			this.speed = this.speed * reduction;

			this.interval = setInterval(function () {
				this.positions.unshift(this.at());
				this.cells.push(Crafty.e('SnakeCell').at(this.positions[0].x, this.positions[0].y));

				while (this.positions.length > this.eaten + this.startingLength) {
					this.positions.pop();
					var old = this.cells.shift();
					old.destroy();
				}

				this.move(this.direction, Game.map_grid.tile.height);

			}.bind(this), this.speed);
		}
	}

});