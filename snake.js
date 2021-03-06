const wrapper = document.getElementById("wrapper");


//Used for directions of the snake
const directionEnum = Object.freeze({
    left: 37,
    up: 38,
    right: 39,
    down: 40
})

const blockColorEnum = Object.freeze({
    snake: "rgb(0, 0, 0)",
    apple: "rgb(221, 4, 4)",
    background: "rgb(196, 186, 186)"
})

//State of the game, the meta information of the game
let state = {
    timer: 100,
    directionTemp: directionEnum.right,
    dimensions: 50,
    snakelength: 3,
    direction: directionEnum.right,
    containsApple: 0
}

//Used to reset the game upon death
const originalState = Object.assign({}, state);

//timer variable for use in speeding up the game
let timer = state.timer;

//Detecting arrow keys, switching state.direction accordingly
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case directionEnum.right:
            if (state.direction != directionEnum.left) {
                state.directionTemp = e.keyCode;
            }
            break;
        case directionEnum.left:
            if (state.direction != directionEnum.right) {

                state.directionTemp = e.keyCode;
            }
            break;
        case directionEnum.up:
            if (state.direction != directionEnum.down) {

                state.directionTemp = e.keyCode;
            }
            break;
        case directionEnum.down:
            if (state.direction != directionEnum.up) {

                state.directionTemp = e.keyCode;
            }
            break;
    }
}

//Function for spawning apples to be called in every cycle of the main loop only when there are no apples on screen already
function spawnApple() {
    const coords = {
        x: Math.floor(Math.random() * state.dimensions),
        y: Math.floor(Math.random() * state.dimensions),
    };
    const id = coords.x + " " + coords.y;
    const appleElement = document.getElementById(id);
    if (appleElement.style["background-color"] === blockColorEnum.snake) {
        spawnApple();
    }
    else {
        appleElement.style["background-color"] = blockColorEnum.apple;
        state.containsApple = 1;
    }
}

//Lose function
function youLost() {
    alert('You lost! Your snake\'s length was: ' + state.snakelength);
    state = Object.assign({}, originalState);
    snake.head = originalSnake.head;
    snake.body = originalSnake.body;
    const arrayOfAllBlocks = Array.from(document.getElementsByClassName("block"));
    arrayOfAllBlocks.forEach(function (e) {
        e.style["background-color"] = blockColorEnum.background;
    })
}

//The initial creation of the map according to the dimensions setting
function init() {
    for (let i = 0; i < (state.dimensions * state.dimensions); i++) {
        const coords = {
            x: i % state.dimensions,
            y: Math.floor(i / state.dimensions)
        }
        const newBlock = document.createElement("div");
        const id = coords.x + " " + coords.y;
        newBlock.style["background-color"] = blockColorEnum.background;
        newBlock.className = "block";
        newBlock.setAttribute("id", id);
        newBlock.setAttribute("x", coords.x);
        newBlock.setAttribute("y", coords.y);
        wrapper.appendChild(newBlock);
    };
}

//Putting the initial snake somewhere in the middle
let snake = {
    head: {
        x: Math.floor(state.dimensions / 2),
        y: Math.floor(state.dimensions / 2),
        duration: state.snakelength
    },
    body: [
        {
            x: Math.floor(state.dimensions / 2) - 2,
            y: Math.floor(state.dimensions / 2),
            duration: state.snakelength - 2
        },
        {
            x: Math.floor(state.dimensions / 2) - 1,
            y: Math.floor(state.dimensions / 2),
            duration: state.snakelength - 1
        }
    ]
}


const originalSnake = Object.assign({}, snake);

const mainLoop = function () {
    state.direction = state.directionTemp;
    //Spawns apple if there are no apples already
    if (state.containsApple === 0) {
        spawnApple();
    }

    //Coordinates of next snake block acccording to location of current snake head and the direction in which it is going
    const nextSnakeCoords = {};
    switch (state.direction) {
        case directionEnum.right:
            nextSnakeCoords.x = snake.head.x + 1;
            nextSnakeCoords.y = snake.head.y;
            break;
        case directionEnum.down:
            nextSnakeCoords.x = snake.head.x;
            nextSnakeCoords.y = snake.head.y + 1;
            break;
        case directionEnum.left:
            nextSnakeCoords.x = snake.head.x - 1;
            nextSnakeCoords.y = snake.head.y;
            break;
        case directionEnum.up:
            nextSnakeCoords.x = snake.head.x;
            nextSnakeCoords.y = snake.head.y - 1;
    }

    //If you run off screen to nonexistant coordinates you die
    if (nextSnakeCoords.x < 0 || nextSnakeCoords.x > (state.dimensions - 1) || nextSnakeCoords.y < 0 || nextSnakeCoords.y > (state.dimensions - 1)) {
        youLost();
        return;
    }

    //Snake length works by duration, the longer the duration of each block, the bigger the trail of snake.
    //Duration is counted in number of times the game has looped
    nextSnakeCoords.duration = state.snakelength;

    //Head becomes body
    snake.body.push(snake.head);

    //New snake block becomes head
    snake.head = nextSnakeCoords;

    //Removing the tail blocks with duration of 0 - the last tail block each cycle in normal gameplay
    for (let i = 0; i < snake.body.length; i++) {
        if (snake.body[i].duration < 2) {
            removedCoords = snake.body.splice(i, 1)[0];
            const id = removedCoords.x + " " + removedCoords.y;
            const removedElement = document.getElementById(id);
            removedElement.style["background-color"] = blockColorEnum.background;
        }
        snake.body[i].duration--;
    }

    //Getting DOM element of new snake block
    const nextId = snake.head.x + " " + snake.head.y;
    const nextSnakeBlock = document.getElementById(nextId);

    //If the snake (black color) hits itself, it dies
    if (nextSnakeBlock.style["background-color"] === blockColorEnum.snake) {
        youLost();
    }

    //If it picks up a red block, snake length increases
    if (nextSnakeBlock.style["background-color"] === blockColorEnum.apple) {
        state.snakelength++;
        state.containsApple = 0;
        state.timer = state.timer * 0.99;
    }

    //make next block a snake
    nextSnakeBlock.style["background-color"] = blockColorEnum.snake;
    clearInterval(intervalId);
    intervalId = setInterval(mainLoop, state.timer);
}

let intervalId;

init();
//main loop
intervalId = setInterval(mainLoop, state.timer);