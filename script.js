const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;

let LEFT, TOP, RIGHT, DOWN;

const balls = [];

class Ball {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		balls.push(this);
		this.isPlayer = true;
	}
	drawBall(x, y, r) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.fillStyle = "green";
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.fill();
	}
}

function positionChange(ball, newPos) {
	if (LEFT) {
		ball.x -= newPos;
	}
	if (TOP) {
		ball.y -= newPos;
	}
	if (RIGHT) {
		ball.x += newPos;
	}
	if (DOWN) {
		ball.y += newPos;
	}
}

function isArrowClicked(e, isClicked) {
	if (e.keyCode === 37) {
		LEFT = isClicked;
	}
	if (e.keyCode === 38) {
		TOP = isClicked;
	}
	if (e.keyCode === 39) {
		RIGHT = isClicked;
	}
	if (e.keyCode === 40) {
		DOWN = isClicked;
	}
}

function moveBall(ball) {
	canvas.addEventListener("keydown", function (e) {
		isArrowClicked(e, true);
	});

	canvas.addEventListener("keyup", function (e) {
		isArrowClicked(e, false);
	});

	positionChange(ball, 2);
}

function mainLoop() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	balls.forEach((ball) => {
		ball.drawBall();
		if (ball.isPlayer) {
			moveBall(ball);
		}
	});
	requestAnimationFrame(mainLoop);
}

let firstBall = new Ball(200, 200, 20);
let secondBall = new Ball(400, 300, 20);

requestAnimationFrame(mainLoop);
