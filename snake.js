const wrapper = document.getElementById("wrapper");

const directionEnum = Object.freeze({
    left: 37,
    up: 38,
    right: 39,
    down: 40
})

let state = {
    timer: 100,
    dimensions: 50,
    snakelength: 3,
    direction: directionEnum.right,
    containsApple: 0
}

const originalState = Object.assign({}, state);

let timer = state.timer;

document.onkeydown = function (e) {
    console.log(state.direction);
    switch (e.keyCode) {
        case directionEnum.right:
            if (state.direction != directionEnum.left) {
                state.direction = e.keyCode;
            }
            break;
        case directionEnum.left:
            if (state.direction != directionEnum.right) {

                state.direction = e.keyCode;
            }
            break;
        case directionEnum.up:
            if (state.direction != directionEnum.down) {

                state.direction = e.keyCode;
            }
            break;
        case directionEnum.down:
            if (state.direction != directionEnum.up) {

                state.direction = e.keyCode;
            }
            break;
    }
}

function spawnApple() {
    const coords = {
        x: Math.floor(Math.random() * state.dimensions),
        y: Math.floor(Math.random() * state.dimensions),
    };
    const id = coords.x + " " + coords.y;
    const appleElement = document.getElementById(id);
    appleElement.style["background-color"] = "rgba(221, 4, 4, 0.8)";
    state.containsApple = 1;
}

function youLost() {
    clearInterval();
    alert('You lost! Your snake\'s length was: ' + state.snakelength);
    state.snakelength = originalState.snakelength;
    state.containsApple = 0;
    state.direction = originalState.direction;
    snake.head = originalSnake.head;
    snake.body = originalSnake.body;
    const arrayOfAllBlocks = Array.from(document.getElementsByClassName("block"));
    arrayOfAllBlocks.forEach(function (e) {
        e.style["background-color"] = "rgba(196, 186, 186, 1)"
    })
}
for (let i = 0; i < (state.dimensions * state.dimensions); i++) {
    const coords = {
        x: i % state.dimensions,
        y: Math.floor(i / state.dimensions)
    }
    const newBlock = document.createElement("div");
    const id = coords.x + " " + coords.y;
    newBlock.classList.add("block");
    newBlock.setAttribute("id", id);
    newBlock.setAttribute("x", coords.x);
    newBlock.setAttribute("y", coords.y);
    wrapper.appendChild(newBlock);
};

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
    if (state.containsApple === 0) {
        spawnApple();
    }
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
    if (nextSnakeCoords.x < 0 || nextSnakeCoords.x > (state.dimensions - 1) || nextSnakeCoords.y < 0 || nextSnakeCoords.y > (state.dimensions - 1)) {
        youLost();
    }
    nextSnakeCoords.duration = state.snakelength;
    snake.body.push(snake.head);
    snake.head = nextSnakeCoords;
    for (let i = 0; i < snake.body.length; i++) {
        if (snake.body[i].duration < 2) {
            removedCoords = snake.body.splice(i, 1)[0];
            const id = removedCoords.x + " " + removedCoords.y;
            const removedElement = document.getElementById(id);
            removedElement.style["background-color"] = "rgba(196, 186, 186, 1)";
        }
        snake.body[i].duration--;
    }

    const nextId = snake.head.x + " " + snake.head.y;
    const nextSnakeBlock = document.getElementById(nextId);
    if (nextSnakeBlock.style["background-color"] === "rgb(0, 0, 0)") {
        youLost();
    }
    if (nextSnakeBlock.style["background-color"] === "rgba(221, 4, 4, 0.8)") {
        state.snakelength++;
        state.containsApple = 0;
    }
    nextSnakeBlock.style["background-color"] = "rgb(0, 0, 0)";
    timer = state.timer / (state.snakelength - 2);
    console.log(timer);
}
setInterval(mainLoop, timer);