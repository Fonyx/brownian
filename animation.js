let canvas = document.querySelector('#myCanvas');
let c = canvas.getContext("2d");
let particleCount = 500;
let maxRadius = 50;
let minRadius = 25;
let circleStroke = 'blue'
let velocityScale = 5;

// set size of canvas to be the size of window
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// a color pallete to choose from
colors = ['#3A8DC5', '#3A48C5', '#3AC5B7', '#7B2FD0', '#CB2FD0', '#2F34D0']

// a class that represents the circle, with two methods, draw and update
function Circle(x, dx, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = this.color;
        c.stroke();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function animate(){
    //  calls a specified function to update an animation before the next repaint
    // this is creating a recursive animation call
    requestAnimationFrame(animate);
    // clear the rectangular view each animation cycle
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < bubbles.length;  i++){
        console.log(bubbles[i]);
        bubbles[i].update();
    };
}

function getRandomIntFromRange(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

let bubbles = [];
for (let i=0; i < particleCount; i++){
    /* this is arranged to not spawn a bubble at an x or y that puts the radius off screen
    because this locks the bubble to the edge by the collision function just reversing
    the direction on edge contact */
    let particleRadius = getRandomIntFromRange(minRadius, maxRadius);

    x = getRandomIntFromRange((0+particleRadius), (innerWidth-particleRadius));
    y = getRandomIntFromRange((0+particleRadius), (innerHeight-particleRadius));

    // to give a random direction of travel, both axis must be independently calculated
    dx = (Math.random()-0.5)*velocityScale;
    dy = (Math.random()-0.5)*velocityScale;

    // radius of particle random
    radius = particleRadius;

    // randomize the color of the bubble
    color = colors[getRandomIntFromRange(1, colors.length)];

    bubbles.push(new Circle(x, dx, y, dy, radius, color));
}

animate();