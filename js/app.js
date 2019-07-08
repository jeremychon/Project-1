
// all the ship information and actions go here
class ship {
	constructor () {
		// attributes: name, speed, score, color, type of ship, etc.
		this.name = "";
	}

	// movement going left and right (possibly up and down)
}


// all the game logic will go here
const game = {

	// playGame ()

	// 

}



// any event listeners will go here







const canvas = document.getElementById('myCanvas');
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx); 

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

// makeX()

function drawGrid () {
	for (let i = 0; i < canvas.width / 50; i += 50) {
		ctx.beginPath()
		ctx.moveTo(i, 0)
		ctx.lineTo(i, canvas.height)
	}

}













