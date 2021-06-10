let canvas = document.querySelector('#myCanvas');
let c = canvas.getContext("2d");
// number of particles in the simulation
let particleCount = 800;
// maximum radius of the bubble random generation
let maxRadius = 20;
// minimum radius of the bubble random generation
let minRadius = 10;
// maximum radius of bubbles during interaction
let maxGrowRadius = 70;
// the maximum speed the bubbles can have
let velocityScale = 5;
// the radius of the circle of the mouse interaction threshold
let mouseAffectSize = 150;
// speed that bubbles change size
let growRate = 5;
// speed that bubbles shrink in size
let shrinkRate = 2;

// set size of canvas to be the size of window
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// a color pallet to choose from
color1 = ['#F3FEB0', '#FEA443', '#705E78', '#A5AAA3', '#0812F33']
color2 = ['#FBA922', '#F0584A', '#2B5877', '#1194A8', '#1FC7B7']
color3 = ['#66D1D1', '#48A2A3', '#115569', '#FCE66F', '#FFFAE8']
color4 = ['#BF303C', '#082640', '#D9BA82', '#F2522E', '#D92323']

colorPallets = [color1, color2, color3, color4]

colors = colorPallets[getRandomIntFromRange(0,3)];

// create a mouse variable to store the mouse position from the event handler
var mouse = {
    x: undefined,
    y: undefined
}

// add mouseover event listener for mouse interactivity
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

// event listener for window resize
window.addEventListener('resize', function(){
    // set size of canvas to be the size of window
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init();

});

// a class that represents the circle, with two methods, draw and update
function Circle(x, dx, y, dy, radius, fill) {
    this.x = x;
    this.y = y;
    this.currentRadius = radius;
    this.minRadius = radius;
    this.fill = fill;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.currentRadius, 0, Math.PI*2, false);
        c.fillStyle = this.fill;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.currentRadius > innerWidth || this.x - this.currentRadius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.currentRadius > innerHeight || this.y - this.currentRadius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity with mouse
        if (mouse.x - this.x < mouseAffectSize && mouse.x - this.x > -mouseAffectSize && 
            mouse.y - this.y < mouseAffectSize && mouse.y - this.y > -mouseAffectSize){
                if (this.currentRadius < maxGrowRadius){
                    this.currentRadius += growRate;
                }
        } else if (this.currentRadius > this.minRadius){
            this.currentRadius -= shrinkRate;
        }

        this.draw();
    }
}

// a function that animates the screen with a recursive running loop
function animate(){
    //  calls a specified function to update an animation before the next repaint
    // this is creating a recursive animation call
    requestAnimationFrame(animate);
    // clear the rectangular view each animation cycle
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < bubbles.length;  i++){
        bubbles[i].update();
    };
}

// generate a randomg integer inside a range
function getRandomIntFromRange(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

// an array to store the bubbles
var bubbles;

function init(){

    bubbles = [];

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

        // randomize the color of the bubble
        // fill = colors[getRandomIntFromRange(0, colors.length)];
        fill = colors[Math.floor(Math.random()*(colors.length))];

        bubbles.push(new Circle(x, dx, y, dy, particleRadius, fill));
    }
}

init();

animate();