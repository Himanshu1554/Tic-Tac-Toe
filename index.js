const boxes = document.querySelectorAll(".box");
const currPlayerInfo = document.querySelector(".curr-ply-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // to empty the boxes on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialize box with css property again to reset the box color property of win
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    currPlayerInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        //swap the turn
        swapTurn();
        //check for win 
        checkWin();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    } else{
        currentPlayer = "X";
    }
    currPlayerInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkWin(){
    let answer = "";

    winningPositions.forEach((position) => {
        // check all three boxes are non empty and should be of same value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== ""
            || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]])
            && (gameGrid[position[1]] === gameGrid[position[2]])
        ){
            //check if winner is X or 0
            if(gameGrid[position[0]] === "X"){
                answer = "X;"
            } else{
                answer = "0";
            }

            //disable the pointer events after we got the winner
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            //change the color of boxes for winner
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    });

    // if we have winner
    if(answer !== ""){
        currPlayerInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active'); 
        return;
    }

    // check for tie match
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    //board fully filled means gaem tied
    if(fillCount === 9){
        currPlayerInfo.innerText = 'Game Tied!';
        newGameBtn.classList.add('active'); 
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener('click', initGame);