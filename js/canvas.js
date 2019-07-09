const canvas = document.getElementById('my-canvas');

const ctx = canvas.getContext('2d');

function makeX () {
	// telling the canvas we're starting a new line
	ctx.beginPath()

	// start the line here
	ctx.moveTo(100, 100)

	// end the line here
	ctx.lineTo(300, 300)

	// style your stroke -- any valid CSS color value works
	ctx.strokeStyle = "blue";

	// this will "stick" until you change it
	ctx.lineWidth = 6;

	// draw the line
	ctx.stroke()

	ctx.beginPath()
	ctx.moveTo(300, 100)
	ctx.lineTo(100, 300);
	ctx.stroke()
}


function makeGrid () {
	for (let i = 0; i < canvas.width; i += 50) {
		ctx.beginPath()
		ctx.moveTo(i, 0)
		ctx.lineTo(i, canvas.height)
		ctx.stroke()

		ctx.beginPath()
		ctx.moveTo(0, i)
		ctx.lineTo(canvas.width, i)
		ctx.stroke()
	}
}


// drawing a rectangle
function makeRectangles () {
	ctx.beginPath()
	ctx.rect(300, 300, 80, 180)
	ctx.strokeStyle = "maroon"
	ctx.lineWidth = 4
	ctx.stroke()

	ctx.beginPath()
	ctx.rect(70, 120, 170, 40)
	ctx.fillStyle = "green"
	ctx.fill()
}

function clearCanvas () {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}



const square = {
	x: 40,
	y: 40,
	height: 50,
	width: 85,
	color: "green",
	speed: 2,

	// added to keep track of which direction he's moving
	direction: {
		up: false,
		left: false,
		down: false,
		right: false
	},

	draw () {
		ctx.beginPath()
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.fillStyle = this.color
		ctx.fill()
	},

	setDirection (key) {
		if (key == 'w') this.direction.up = true;
		if (key == 'a') this.direction.left = true;
		if (key == 's') this.direction.down = true;
		if (key == 'd') this.direction.right = true;
	},

	unsetDirection (key) {
		if (key == 'w') this.direction.up = false;
		if (key == 'a') this.direction.left = false;
		if (key == 's') this.direction.down = false;
		if (key == 'd') this.direction.right = false;
	},

	move () {
		if (this.direction.up) this.y -= this.speed;
		if (this.direction.left) this.x -= this.speed;
		if (this.direction.down) this.y += this.speed;
		if (this.direction.right) this.x += this.speed;
	},

	checkCollision(thing) {
		if (this.x + this.width > thing.x &&
			this.x < thing.x + thing.width &&
			thing.y < this.y + this.height &&
			thing.y + thing.height > this.y) {
			console.log('collision');
			return true;
		} else {
			return false;
		}
	}
 }

// square.draw()


// making a circle
function makeCircle () {
	ctx.beginPath()
	ctx.arc(300, 125, 71, 0, Math.PI * 2)
	ctx.fillStyle = "lavender"
	ctx.fill()

	ctx.beginPath()
	ctx.arc(300, 125, 71, 0, Math.PI * 2)
	ctx.strokeStyle = "red"
	ctx.lineWidth = 5
	ctx.stroke()
}


const circle = {
	x: 100,
	y: 400,
	radius: 80,
	speed: 10,
	color: "purple",
	draw () {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		ctx.fillStyle = this.color
		ctx.fill()
	},
	move (direction) {
		if (direction == "ArrowDown" && this.y < canvas.height - this.radius) {
			this.y += this.speed
		}
		if (direction == "ArrowUp" && this.y > this.radius) {
			this.y -= this.speed
		}
		if (direction == "ArrowLeft" && this.x > this.radius) {
			this.x -= this.speed
		}
		if (direction == "ArrowRight" && this.x < canvas.width - this.radius) {
			this.x+= this.speed
		}

		clearCanvas();
		this.draw()
	}
}

circle.draw()

const obstacle = {
	x: 250,
	y: 250,
	width: 100,
	height: 100,
	color: 'black',
	draw () {
		ctx.beginPath()
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.fillStyle = this.color
		ctx.fill()
	}
}

obstacle.draw()

const stopAnimation = () => {
	cancelAnimationFrame(requestID)
	animationRunning = false;
}

// ANIMATION FRAME
let requestID;
let animationRunning = false;

let x = 0;
function animate () {
	// code will be repeated about 60 times / sec

	animationRunning = true;

	square.move();
	clearCanvas();
	square.draw();

	circle.draw();

	obstacle.draw();

	if (square.checkCollision(obstacle)) {
		gameOver();
		return;
	} else {
		// recursion
		requestID = window.requestAnimationFrame(animate);
	}

}

animate()

function gameOver() {
  document.write(`
    <h1>YOU ARE DEAD YOU SHOULD NOT HAVE CRASHED INTO THAT</h1>
    <form>
      <input type="hidden" value="you also shouldn't capitalize your html or use style='' because it's not 1995">
      <button style="font-size: 18pt">click</button>
    </form>
  `)
}



document.getElementById('makeXButton').addEventListener('click', () => {
	makeX();
})
document.getElementById('gridButton').addEventListener('click', () => {
	makeGrid();
})
document.getElementById('rectButton').addEventListener('click', () => {
	makeRectangles()
})
document.getElementById('clear').addEventListener('click', () => {
	clearCanvas()
})

document.getElementById('circleButton').addEventListener('click', () => {
	makeCircle()
})

document.addEventListener('keydown', (e) => {
	circle.move(e.key)

	square.setDirection(e.key)

	if (e.key === '1') {
		if (!animationRunning) animate()
	}
	if (e.key === '2') {
		stopAnimation()
	}

})

document.addEventListener('keyup', (e) => {
	if (['w', 'a', 's', 'd'].includes(e.key)) {
		square.unsetDirection(e.key)
	}
})

document.getElementById('stopAnimation').addEventListener('click', (e) => {
	stopAnimation();
})