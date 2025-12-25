const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const balls = [];

let LEFT, TOP, RIGHT, DOWN;

VELOCITY = 1;

// create the ball class
// the constructor has default values so you don't have to pass argument if you don't want to
// add the created ball to the balls array
// draw the ball
class Ball {
	constructor(x = 100, y = 100, r = 20, velocity = VELOCITY, isPlayer = false) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.vel_x = 0;
		this.vel_y = 0;
		this.velocity = velocity;
		this.isPlayer = isPlayer;
		balls.push(this);
	}
	drawBall() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.fillStyle = "green";
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.fill();
	}
}

function positionChange(ball) {
	if (LEFT) {
		ball.vel_x = -ball.velocity;
	}
	if (TOP) {
		ball.vel_y = -ball.velocity;
	}
	if (RIGHT) {
		ball.vel_x = ball.velocity;
	}
	if (DOWN) {
		ball.vel_y = ball.velocity;
	}
	if (!TOP && !DOWN) {
		ball.vel_y = 0;
	}
	if (!RIGHT && !LEFT) {
		ball.vel_x = 0;
	}
	ball.x += ball.vel_x;
	ball.y += ball.vel_y;
}

function isArrowClicked(e, isClicked) {
	if (e.key === "ArrowLeft") {
		LEFT = isClicked;
	}
	if (e.key === "ArrowUp") {
		TOP = isClicked;
	}
	if (e.key === "ArrowRight") {
		RIGHT = isClicked;
	}
	if (e.key === "ArrowDown") {
		DOWN = isClicked;
	}
}

canvas.addEventListener("keydown", function (e) {
	isArrowClicked(e, true);
});

canvas.addEventListener("keyup", function (e) {
	isArrowClicked(e, false);
});

function moveBall(ball) {
	positionChange(ball);
}

function mainLoop() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	balls.forEach((ball) => {
		ball.drawBall();
		if (ball.isPlayer) {
			moveBall(ball);
		}
	});

	// performance wise this is better the the interval but READMORE about it
	requestAnimationFrame(mainLoop);
}

let firstBall = new Ball(100, 100, 30, 5, true);
let secondBall = new Ball();

requestAnimationFrame(mainLoop);
