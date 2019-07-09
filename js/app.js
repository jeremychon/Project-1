
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
		this.speed = 4;
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
		// if (this.direction.up) this.y -= this.speed
		if (this.direction.left == true && this.x > this.r) this.x -= this.speed
		// if (this.direction.down) this.y += this.speed
		if (this.direction.right == true && this.x < canvas.width - this.r) this.x += this.speed
	}

	setDirection (key) {
		// if (key == 'ArrowUp') this.direction.up = true;
		if (key == 'ArrowLeft') this.direction.left = true;
		// if (key == 'ArrowDown') this.direction.down = true;
		if (key == 'ArrowRight') this.direction.right = true;
	}

	unsetDirection (key) {
		// if (key == 'ArrowUp') this.direction.up = false;
		if (key == 'ArrowLeft') this.direction.left = false;
		// if (key == 'ArrowDown') this.direction.down = false;
		if (key == 'ArrowRight') this.direction.right = false;
	}
}


// all the game logic will go here
const game = {

	ship: null,

	playGame () {
		const player = new Ship()
		player.makeShip()
		this.ship = player
		console.log(this.ship);
		animate()
	},

	clearCanvas () {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}

	// 

}

game.playGame()


let x = 0;
function animate () {
	game.ship.moveShip();
	game.clearCanvas();
	game.ship.makeShip();

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





















