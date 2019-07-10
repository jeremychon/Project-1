
const $canvas = $('#my-canvas')
const $ctx = $canvas[0].getContext('2d')

// all the ship information and actions go here
class Ship {
	constructor (name) {
		// attributes: name, speed, score, color, type of ship, etc.
		this.name = name;
		this.x = 300;
		this.y = 680;
		this.r = 25;
		this.color = 'black';
		this.speed = 7;
		this.isAlive = true
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

	gameOver () {
		if (this.isAlive === true) {
			console.log('Keep going');
		} else {
			const $gameOverTag = $('<div/>').text("GAME OVER!");
			$gameOverTag.css({
				backgroundColor: "rgba(0, 0, 0)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				color: "white",
				fontSize: "45px",
				width: "400px",
				height: "360px",
				animation: "fadein 3s",
				zIndex: "2",
				position: "absolute"
			})

			$canvas[0].append($gameOverTag)
		}
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

	fall() {
		this.y += this.speed
	}
}


// all the game logic will go here
const game = {

	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	ship: null,
	block: [],
	intervalID: null,

	playGame () {
		const $player = new Ship()
		$player.makeShip()
		this.ship = $player
		console.log(this.ship);

		this.setTimer()
	},

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

			$('#time').text(`Time: ${this.time.hours}h ${this.time.minutes}m ${this.time.seconds}s`)
		}, 1000)
	},

	makeObstacles(num) {
		
		let regionSize = 600 / num
		const gap = 100

		if (num === 1) {
			for (let i = 1; i <= 1; i++) {
				const $obs = new Obstacle(Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * (500 - 200 + 1) + 200))
				$obs.draw()
				this.block.push($obs)
			}
		}

		if (num === 2) {
			for (let i = 0; i < 1; i++) {
				const $obs = new Obstacle(0, Math.floor(Math.random() * (400 - 100 + 1) + 100))
				$obs.draw()
				this.block.push($obs)
			}


			for (let i = 0; i < 1; i += 2) {
				const $obs = new Obstacle(parseInt(this.block[this.block.length - 1].width) + 100, $canvas[0].width - (parseInt(this.block[this.block.length - 1].width)))
				$obs.draw()
				this.block.push($obs)
			}

			// console.log(this.block);
		}
	},

	clearCanvas () {
		$ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height)
	},

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

game.playGame()

let x = 0;
let it;
function animate () {

	game.ship.moveShip();
	game.clearCanvas();
	game.ship.makeShip();

	x++

	if (x % 120 == 0 && x % 180 == 0) {
		game.makeObstacles(2)
	} else if (x % 180 == 0) {
		game.makeObstacles(2)
	} else if (x % 120 == 0) {
		game.makeObstacles(1)
	}

	for (let i = 0; i < game.block.length; i++) {
		game.block[i].fall()
		game.block[i].draw()

		// if (x > 300) {
		// 	game.block[i].speed = 5
		// }

		if (game.checkCollision(game.ship, game.block[i])) {
			game.ship.isAlive = false
			game.ship.gameOver()
			return;
		}
	}
	
	it = window.requestAnimationFrame(animate)

}

animate()



// any event listeners will go here

$(document).on('keydown', (e) => {
	if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
		game.ship.setDirection(e.key)
	}
	if(e.key==" ") {
		cancelAnimationFrame(it)
		clearInterval(game.intervalID)
	}

})

$(document).on('keyup', (e) => {
	if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
		game.ship.unsetDirection(e.key)
	}
})





















