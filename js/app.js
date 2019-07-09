
const canvas = document.getElementById('my-canvas')
const ctx = canvas.getContext('2d')

// all the ship information and actions go here
class Ship {
	constructor () {
		// attributes: name, speed, score, color, type of ship, etc.
		this.name = "";
		this.x = 300;
		this.y = 680;
		this.r = 25;
		this.color = 'black';
		this.speed = 7;
		this.isAlive = true
		this.direction = {
			// up: false,
			left: false,
			// down: false,
			right: false
		}
	}

	// movement going left and right (possibly up and down)
	makeShip () {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		ctx.fillStyle = this.color;
		ctx.fill()
	}

	moveShip () {
		if (this.direction.up) this.y -= this.speed
		if (this.direction.left == true && this.x > this.r) this.x -= this.speed
		if (this.direction.down) this.y += this.speed
		if (this.direction.right == true && this.x < canvas.width - this.r) this.x += this.speed
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
			document.write(`<h1>Game Over</h1>`)
		}
	}
}

class Obstacle {
	constructor () {
		this.x = 0;
		this.y = 0;
		this.height = 20;
		this.width = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
		this.gap = Math.floor(Math.random() * (200 - 100 + 1)) + 100
		this.color = "green";
		this.speed = 3;
	}

	makeLeftObstacle () {
		ctx.beginPath()
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	makeRightObstacle () {
		ctx.beginPath()
		ctx.rect(this.width + this.gap, this.y, canvas.width - (this.width + this.gap) , this.height)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	fallLeft () {
		this.y += this.speed
		this.makeLeftObstacle()
	}

	fallRight () {
		this.y += this.speed		
		this.makeRightObstacle()
	}
}


// all the game logic will go here
const game = {

	ship: null,
	leftBlock: [],
	rightBlock: [],
	frame: 0,
	intervalID: null,

	playGame () {
		const player = new Ship()
		player.makeShip()
		this.ship = player
		console.log(this.ship);

		this.setTimer();
	},

	setTimer () {
		this.intervalID = setInterval( () => {
			const obstacle = new Obstacle()
			obstacle.makeLeftObstacle();
			this.leftBlock.push(obstacle);
			// console.log(this.leftBlock);
			this.frame = this.leftBlock.length
		}, 1000)

		this.intervalID = setInterval( () => {
			const obstacle = new Obstacle()
			obstacle.makeRightObstacle();
			this.rightBlock.push(obstacle);
			// console.log(this.rightBlock);
			this.frame = this.rightBlock.length
		}, 1000)
	},

	clearCanvas () {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
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
			return true; 
		}
	},

	// 

}

game.playGame()

let x = 0;
function animate () {
	// console.log(x++);
	game.ship.moveShip();
	game.clearCanvas();
	game.ship.makeShip();


	// every 
	for (let i = 0; i < game.frame; i++) {
		game.leftBlock[i].fallLeft()
		game.rightBlock[i].fallRight()
		if (game.checkCollision(game.ship, game.leftBlock[i])) {
			game.ship.isAlive = false
			game.ship.gameOver()
			return;
		}
		if (game.checkCollision(game.ship, game.rightBlock[i])) {
			game.ship.isAlive = false
			game.ship.gameOver()
			return;
		}
	}
			window.requestAnimationFrame(animate)

}

animate()



// any event listeners will go here

document.addEventListener('keydown', (e) => {
	if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
		game.ship.setDirection(e.key)
	}
	console.log(e.key);

})

document.addEventListener('keyup', (e) => {
	if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) {
		game.ship.unsetDirection(e.key)
	}
})





















