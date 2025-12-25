const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const balls = [];

let LEFT, TOP, RIGHT, DOWN;

VELOCITY = 1;

class Ball {
	constructor(x = 100, y = 100, r = 20, isPlayer = false) {
		this.x = x;
		this.y = y;
		this.r = r;
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
		ball.x -= VELOCITY;
	}
	if (TOP) {
		ball.y -= VELOCITY;
	}
	if (RIGHT) {
		ball.x += VELOCITY;
	}
	if (DOWN) {
		ball.y += VELOCITY;
	}
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
	requestAnimationFrame(mainLoop);
}

let firstBall = new Ball(100, 100, 30, true);
let secondBall = new Ball();

requestAnimationFrame(mainLoop);
