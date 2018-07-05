const wrapper = document.getElementById("wrapper");
wrapper.setAttribute("snakelength", "3");
wrapper.setAttribute("direction", "right");
wrapper.setAttribute("containsapple", "false");
for (let j = 1; j < 101; j++) {
    const newBlock = document.createElement("div");
    newBlock.classList.add("block");
    newBlock.setAttribute("id", j);
    newBlock.setAttribute("isLeader", "false");
    newBlock.setAttribute("duration", "0");
    newBlock.setAttribute("hasApple", "false");
    wrapper.appendChild(newBlock);
};
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            wrapper.setAttribute("direction", "left");
            break;
        case 38:
            wrapper.setAttribute("direction", "up");
            break;
        case 39:
            wrapper.setAttribute("direction", "right");
            break;
        case 40:
            wrapper.setAttribute("direction", "down");
            break;
    }
}
const refreshPage = function () {
    for (let i = 1; i < 101; i++) {
        let nextBlock;
        const element = document.getElementById(i);
        const duration = element.getAttribute("duration");
        if (wrapper.getAttribute("containsapple") == "false") {
            if (Math.random() * 100 < 1) {
                wrapper.setAttribute("containsapple", "true");
                element.setAttribute("hasApple", "true");
            }
        }
        if (duration == "0") {
            element.style["background-color"] = "rgba(196, 186, 186, 0.8)";
        }
        if (element.getAttribute("hasApple") == "true") {
            element.style["background-color"] = "rgba(221, 4, 4, 0.8)";
        }
        if (duration > 0) {
            element.setAttribute("duration", ((Number(duration) - 1).toString()));
            element.style["background-color"] = "rgb(0, 0, 0)";
            if (element.getAttribute("isLeader") == "true") {
                switch (wrapper.getAttribute("direction")) {
                    case "right":
                        nextBlock = i + 1;
                        break;
                    case "left":
                        nextBlock = i - 1;
                        break;
                    case "up":
                        nextBlock = i - 10;
                        break;
                    case "down":
                        nextBlock = i + 10;
                        break;
                }
                const nextElement = document.getElementById(nextBlock.toString());
                if (Number(nextElement.getAttribute("duration")) > 0) {
                    alert("You lost!");
                }
                if (nextElement.getAttribute("hasApple") == "true") {
                    wrapper.setAttribute("containsapple", "false");
                    wrapper.setAttribute("snakelength", (Number(wrapper.getAttribute("snakelength")) + 1));
                    console.log(wrapper.getAttribute("snakelength"));
                }
                element.setAttribute("isLeader", "false");
                nextElement.setAttribute("isLeader", "true");
                nextElement.setAttribute("duration", wrapper.getAttribute("snakelength"));
            }
        }
    }
}
const snakeHeadStart = document.getElementById("55");
const snakeTailStart = document.getElementById("53");
const snakeBodyStart = document.getElementById("54");
snakeHeadStart.setAttribute("isLeader", "true");
const snakelengthNumber = Number(wrapper.getAttribute("snakelength"));
snakeHeadStart.setAttribute("duration", snakelengthNumber.toString());
snakeBodyStart.setAttribute("duration", (snakelengthNumber-1).toString());
console.log(wrapper.getAttribute("snakelength"));
document.getElementById("53").setAttribute("duration", (snakelengthNumber-2).toString());
setInterval(refreshPage, 100);