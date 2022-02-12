
// GAME CONSTANTS AND VARIABLES
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
const looseSound = new Audio('loose.mp3');
const bgSound = new Audio('bgsound.mp3');
let speed = prompt("Select The Speed [Double TAP on Screen to ENABLE Sound]: ",8);
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
    { x: 9, y: 9 }
]

let food = { x: 3, y:7 };


// GAME FUNCTIONS

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return
    }
    lastPaintTime = ctime;
    gameEngine();
}
    //Collide Function
    function isCollide(sarr){

        // if you bump into yourself
        for (let i = 1; i < snakeArray.length; i++) {
            if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y ){
                return true;
            }
        }

        // if you bump into the wall
        if(snakeArray[0].x >= 18 || snakeArray[0].x <=0 || snakeArray[0].y >= 18 || snakeArray[0].y <=0){
            return true;
        }
    }
function gameEngine() {
    // PART 1 :  Updating the Snake array & Food
    if (isCollide(snakeArray)){
        bgSound.pause();
        looseSound.play();
        inputDir = {x:0, y:0};
        alert("GAME OVER ! Press any Arrow Key to play again.");
        snakeArray = [
            {x:9,y:9}
        ]
        bgSound.play()
        score= 0;

    }
    
    // If you have eaten the food then regenerate the food and increase the score
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y){
        foodSound.play();
        score +=1;
        if(hiscoreval<score){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "High Score: "+ hiscoreval;
        }
        scorebox.innerHTML = "Score: "+score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        food = {x: Math.round( 2 + (16-2)*Math.random()), y: Math.round( 2 + (16-2)*Math.random()) }
    }

    // MOVING THE SNAKE
    for (let i = snakeArray.length-2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // PART 2 :  Displaying the Snake array & Food
    // Displaying the Snake array
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Displaying the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}








// MAIN LOGIC STARTS HERE


let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "High Score: "+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    bgSound.loop = true;
    bgSound.play();
    
    inputDir = {x:0,y:0};
    switch (e.key) {
        case "ArrowUp":
//             console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.play();

            break;

        case "ArrowDown":
//             console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            moveSound.play();

            break;

        case "ArrowLeft":
//             console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            moveSound.play();

            break;

        case "ArrowRight":
//             console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            moveSound.play();
            break;
    
        default:
            break;
    }
})

window.addEventListener('touchstart', handleTouchStart, false);        
window.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        // bgSound.loop = true;
        // bgSound.play();
        if ( xDiff > 0 ) {
//             console.log("left swipe");
            inputDir.x = -1;
            inputDir.y = 0;
            
            moveSound.play();

            // break;
        } else {
//             console.log("right swipe");
            
            inputDir.x = 1;
            inputDir.y = 0;
            moveSound.play();
            // break;
        }                       
    } else {
        // bgSound.loop = true;
        // bgSound.play();
        if ( yDiff > 0 ) {
//             console.log("up swipe");
            
            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.play();

            // break;
        } else { 
//             console.log("down swipe");
            
            inputDir.x = 0;
            inputDir.y = 1;
            moveSound.play();

            // break;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
