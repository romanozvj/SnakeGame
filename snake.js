const wrapper = document.getElementById("wrapper");
for (let j = 0; j < 100; j++) {
    const newBlock = document.createElement("div");
    newBlock.classList.add("block");
    newBlock.setAttribute("id", j);
    newBlock.textContent = "O";
    newBlock.setAttribute("isLeader", "false");
    newBlock.setAttribute("duration", "0");
    newBlock.setAttribute("hasApple", "false");
    document.getElementById("wrapper").appendChild(newBlock);
};
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            document.getElementById("wrapper").setAttribute("direction", "left");
            break;
        case 38:
            document.getElementById("wrapper").setAttribute("direction", "up");
            break;
        case 39:
            document.getElementById("wrapper").setAttribute("direction", "right");
            break;
        case 40:
            document.getElementById("wrapper").setAttribute("direction", "down");
            break;
    }
}
const refreshPage = function () {
    for (let i = 0; i < 100; i++) {
        const element = document.getElementById(i.toString());
        const duration = Number(element.duration);
        if (document.getElementById("wrapper").containsapple === "false") {
            if (Math.random() * 100 < 2) {
                document.getElementById("wrapper").setAttribute("containsapple", "true");
                document.getElementById(i.toString()).setAttribute("hasApple", "true");
            }
        }
        if (duration === "0") {
            document.getElementById(i.toString()).style["background-color"] = "rgba(196, 186, 186, 0.8)";
        }
        if (document.getElementById(i.toString()).hasApple === "true") {
            document.getElementById(i.toString()).style["background-color"] = "rgba(221, 4, 4, 0.8)";
        }
        if (duration > 0) {
            document.getElementById(i.toString()).setAttribute("duration", (duration - 1).toString());
            document.getElementById(i.toString()).style["background-color"] = "rgba(15, 7, 7, 0.3)";
            if (document.getElementById(i.toString()).isLeader === "true") {
                let nextBlock;
                switch (document.getElementById("wrapper").direction) {
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
                if (Number(nextElement.duration) > 0) {
                    alert("You lost!");
                }
                if (nextElement.hasApple === "true") {
                    document.getElementById("wrapper").setAttribute("containsapple", "false");
                    document.getElementById("wrapper").setAttribute("snakelength", (Number(document.getElementById("wrapper").snakelength) + 1));
                }
                document.getElementById(i.toString()).setAttribute("isLeader", "false");
                document.getElementById(nextBlock.toString()).setAttribute("isLeader", "true");
                document.getElementById(nextBlock.toString()).setAttribute("duration", document.getElementById("wrapper").snakelength);
            }
        }
    }
}
const thirdBlock = document.getElementById("55");
document.getElementById("53").setAttribute("isLeader", "true");
const snakelengthNumber = Number(document.getElementById("wrapper").snakelength);
document.getElementById("55").setAttribute("duration", snakelengthNumber.toString());
document.getElementById("54").setAttribute("duration", (snakelengthNumber-1).toString());
document.getElementById("53").setAttribute("duration", (snakelengthNumber-2).toString());
setInterval(refreshPage, 100);