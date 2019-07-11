
const $canvas = $('#my-canvas')
const $ctx = $canvas[0].getContext('2d')

// all the ship information and actions go here
class Ship {
	constructor (name) {
		// attributes: name, speed, score, color, type of ship, etc.
		// this.name = name;
		this.x = 275;
		this.y = 580;
		this.r = 20;
		this.color = 'red';
		this.speed = 7;
		this.direction = {
			up: false,
			left: false,
			down: false,
			right: false
		}
	}

	// movement going left and right (possibly up and down)
	makeShip () {
		$ctx.beginPath()
		$ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		$ctx.fillStyle = this.color;
		$ctx.fill()
	}

	moveShip () {
		if (this.direction.up == true && this.y > this.r) this.y -= this.speed
		if (this.direction.left == true && this.x > this.r) this.x -= this.speed
		if (this.direction.down == true && this.y < $canvas[0].height - this.r) this.y += this.speed
		if (this.direction.right == true && this.x < $canvas[0].width - this.r) this.x += this.speed
	}

	setDirection (key) {
		if (key == 'ArrowUp') this.direction.up = true;
		if (key == 'ArrowLeft') this.direction.left = true;
		if (key == 'ArrowDown') this.direction.down = true;
		if (key == 'ArrowRight') this.direction.right = true;
	}

	unsetDirection (key) {
		if (key == 'ArrowUp') this.direction.up = false;
		if (key == 'ArrowLeft') this.direction.left = false;
		if (key == 'ArrowDown') this.direction.down = false;
		if (key == 'ArrowRight') this.direction.right = false;
	}
}

class Obstacle {
	constructor (obsX, obsWidth) {
		this.x = obsX;
		this.y = 0;
		this.height = 20;
		this.width = obsWidth;
		this.color = "green";
		this.speed = 3;
	}

	draw () {
		$ctx.beginPath()
		$ctx.rect(this.x, this.y, this.width, this.height)
		$ctx.fillStyle = this.color
		$ctx.fill()
	}

	fall () {
		this.y += this.speed
	}

	speedUp () {
		if (game.level > 10) {
			this.speed = 8
		} else if (game.level >= 8) {
			this.speed = 6
		} else if (game.level >= 5) {
			this.speed = 5
		} else if (game.level >= 2) {
			this.speed = 4
		} else {
			this.speed = 3
		}
	}
}


// all the game logic will go here
const game = {

	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	score: 0,
	level: 0,
	ship: null,
	block: [],
	// create an array for "coins"
	intervalID: null,

	startGame () {
		$('#canvas-text').text('Press SPACE to start the game')
	},

	// create ship and start timer
	playGame () {
		const $player = new Ship()
		$player.makeShip()
		this.ship = $player
		console.log(this.ship);

		$('#lvl').text(`LEVEL:${this.level}`)
		$('#score').text(`SCORE:${this.score}`)
		$('#time').text(`TIME:${this.time.hours}h ${this.time.minutes}m ${this.time.seconds}s`)

		this.setTimer()
	},

	endGame () {
		this.clearCanvas()
		$('#canvas-text').text('Game Over').addClass('canvas-text-styles').css({
			fontSize: "45px",
			justifyContent: "center"
		})
		const $restart = $('<div/>').text('Would you like to restart?').addClass('canvas-text-styles').css({
			marginTop: "20px"
		})
		$('#endgame').append($restart)
		const $yesOrNo = $('<div/>').text('(Y/N)').addClass('canvas-text-styles').css({
			marginTop: "15px"
		})
		$('#endgame').append($yesOrNo)
	},

	// adds score whenever an obstacle leaves the picture
	showScore () {
		if (this.block.length > 0 && this.block[0].y >= 750) {
				this.score += 1;
				$('#score').text(`SCORE:${this.score}`)
				this.block.shift()
		}		
	},

	// shows the level the player is in
	levelUp () {
		this.level += 1
		$('#lvl').text(`LEVEL:${this.level}`)

	},

	// creates a timer that logs seconds, minutes, and hours
	setTimer () {
		this.intervalID = setInterval( () => {
			this.time.seconds++;

			// every 60 seconds, increase the minute by 1
			if (this.time.seconds === 60) {
				this.time.minutes++
				this.time.seconds = 0;
			}

			// every 60 minutes, increase the hour by 1
			if (this.time.minutes === 60) {
				this.time.hours++
			}

			$('#time').text(`TIME:${this.time.hours}h ${this.time.minutes}m ${this.time.seconds}s`)
		}, 1000)
	},

	// makes 1 - 3 obstacles based on the number given
	makeObstacles(num) {
		
		// let region = 600 / num
		const gap = 100

		if (num === 1) {
			for (let i = 1; i <= 1; i++) {
				const $obs = new Obstacle(Math.floor(Math.random() * 150) + 1, Math.floor(Math.random() * (400 - 200 + 1) + 200))
				$obs.draw()
				$obs.speedUp()
				console.log($obs.speed);
				this.block.push($obs)
			}
		}

		if (num === 2) {
			for (let i = 0; i < 1; i++) {
				const $obs = new Obstacle(0, Math.floor(Math.random() * (400 - 100 + 1) + 100))
				$obs.draw()
				$obs.speedUp()
				this.block.push($obs)
			}


			for (let i = 0; i < 1; i++) {
				const $obs = new Obstacle(parseInt(this.block[this.block.length - 1].width) + 100, $canvas[0].width - (parseInt(this.block[this.block.length - 1].width)))
				$obs.draw()
				$obs.speedUp()
				this.block.push($obs)
			}
		}

		if (num === 3) {
			for (let i = 0; i < 1; i++) {
				const $obs = new Obstacle(0, Math.floor(Math.random() * (120 - 100 + 1) + 100))
				$obs.draw()
				$obs.speedUp()
				this.block.push($obs)
			}

			for (let i = 0; i < 1; i ++) {
				const $obs = new Obstacle(parseInt(this.block[this.block.length - 1].width) + 100, Math.floor(Math.random() * (120 - 70 + 1) + 70))
				$obs.draw()
				$obs.speedUp()
				this.block.push($obs)
			}

			for (let i = 0; i < 1; i++) {
				const $obs = new Obstacle(parseInt(this.block[this.block.length - 1].width) + parseInt(this.block[this.block.length - 2].width) + (gap * 2), $canvas[0].width - (parseInt(this.block[this.block.length - 1].width) + parseInt(this.block[this.block.length - 2].width) + (gap * 2)))
				$obs.draw()
				$obs.speedUp()
				this.block.push($obs)
			}
		}
	},

	clearCanvas () {
		$ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height)
	},
	
	// check if the ship hits a block
	checkCollision (ship, block) {
		let testX = ship.x
		let testY = ship.y

		if (ship.x < block.x) {testX = block.x}
		if (ship.x > block.x + block.width) {testX = block.x + block.width}
		if (ship.y < block.y) {testY = block.y}
		if (ship.y > block.y + block.height) {testY = block.y + block.height}

		let distX = ship.x - testX
		let distY = ship.y - testY
		let distance = Math.sqrt((distX*distX) + (distY*distY))

		if (distance <= ship.r) {
			clearInterval(this.intervalID)
			return true; 
		}
	},
}

game.startGame()

let x = 0;
let it;
function animate () {

	game.ship.moveShip();
	game.clearCanvas();
	game.ship.makeShip();

	x++

	/// WHEN TO CREATE OBSTACLES
	// at seconds divisible by 2 AND 3, make 2 obstacles
	if (x % 120 == 0 && x % 180 == 0) {
		game.makeObstacles(3)
	// at every 3 seconds, make 2 obstacles
	} else if (x % 180 == 0) {
		game.makeObstacles(2)
	// at every 2 seconds, make 1 obstacle
	} else if (x % 60 == 0) {
		game.makeObstacles(1)
	}

	for (let i = 0; i < game.block.length; i++) {
		game.block[i].fall()
		game.block[i].draw()


		if (game.checkCollision(game.ship, game.block[i])) {
			game.endGame()
			return;
		}
	}


	if (x % 600 === 0) {
		game.levelUp()
	}

	game.showScore()
	
	it = window.requestAnimationFrame(animate)

}

// animate()


// any event listeners will go here
$(document).on('keydown', (e) => {
	if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
		game.ship.setDirection(e.key)
	}
	if(e.key == "q") {
		cancelAnimationFrame(it)
		clearInterval(game.intervalID)
	}
	if (e.key == " ") {
		$('#canvas-text').removeClass().text(" ")
		game.playGame();
		animate()
	}

})

$(document).on('keyup', (e) => {
	if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
		game.ship.unsetDirection(e.key)
	}
})





















