
// all the ship information and actions go here
class ship {
	constructor () {
		// attributes: name, speed, score, color, type of ship, etc.
		this.name = "";
		this.x = 300;
		this.y = 700;
		this.r = 25;
		this.color = 'black';
		this.speed = 10;
		this.direction = {
			up: false,
			left: false,
			down: false,
			right: false
		}
	}

	// movement going left and right (possibly up and down)
	makeShip () {
		const canvas = document.getElementById('my-canvas')
		const ctx = canvas.getContext('2d')

		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		ctx.fillStyle = this.color;
		ctx.fill()
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
	
	moveShip () {
		if (this.direction.up) this.y -= this.speed
		if (this.direction.left) this.x -= this.speed
		if (this.direction.down) this.y += this.speed
		if (this.direction.right) this.x += this.speed
	}
}


// all the game logic will go here
const game = {

	ship: null,

	playGame () {
		const $ship = new ship()
		this.ship = $ship
		$ship.makeShip()
	}

	// 

}

game.playGame()


let x = 0;
function animate () {

}



// any event listeners will go here

document.addEventListener('keydown', (e) => {
	console.log(e.key);
})





















