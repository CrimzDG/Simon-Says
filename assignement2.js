
const startButton = document.getElementById("start");
const red1 = document.querySelector(".red-button");
const blue2 = document.querySelector(".blue-button");
const green3 = document.querySelector(".green-button");
const yellow4 = document.querySelector(".yellow-button");
const status1 = document.querySelector(".status");
const allButtons = [red1,blue2,green3,yellow4];
let playerTurn = false;
let currentScore = 0;
let highestScore =0;

//Adds a random buttom to our game sequence 
const addButton = () =>
{
    return allButtons[parseInt(Math.random() * allButtons.length)]; 
}
let correctSequence= [addButton()];
let userSequence = [...correctSequence];

//Flashes the correct sequence of buttons using promises and timeouts to create space between pulse
const pulse = gameButton => 
{
    return new Promise((resolve, reject) =>{
    playerTurn=false;
    gameButton.className += ' active';
        setTimeout(() => {
         gameButton.className = gameButton.className.replace(' active', '');
        
        setTimeout(() => 
        {
            resolve();
        } ,300);
        }
        ,750);
    });
};
//Once our sequence is finished and player is allowed to click our listener on the buttons in our html will pick up which button is pressed and compare it to the buttons in the correct sequence
const buttonPressed = gameButtonPressed =>
{
    if(!playerTurn) return;
    const correctAnswer = userSequence.shift();
    //Correct input
    if(correctAnswer === gameButtonPressed)
    {
        if(userSequence.length === 0)
        {
            correctSequence.push(addButton());
            userSequence = [...correctSequence];
            currentScore++;
            document.getElementById("right").innerHTML = currentScore;
            beginGame();
        }
    }
    //Wrong input/Game Over
    else{
        if(currentScore>document.getElementById("left").innerHTML)
        {
            document.getElementById("left").innerHTML = currentScore;
        }
        currentScore =0;
        document.getElementById("right").innerHTML = currentScore;
        failure();

    }
}
const beginGame = async () => 
{   
    
    for(const gameButton of correctSequence) 
    {
        await pulse(gameButton);
    }
   playerTurn = true;
}
function await()//This function turns the power button to green and makes sure to wait 3 seconds before the main game will start
{
    status1.style.backgroundColor = "green";
    playerTurn = false;
    startButton.disabled = true;
    setTimeout(() => {beginGame()},3000);
}
function failure()
{
    correctSequence =[];
    correctSequence= [addButton()];
    userSequence =[];
    userSequence = [...correctSequence];
    gameEndFlash();
    status1.style.backgroundColor = "red";
    startButton.disabled = false;
}
//For 5 flashes on game end
function gameEndFlash() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        red1.classList.add("active");
        blue2.classList.add("active");
        green3.classList.add("active");
        yellow4.classList.add("active");
  
        setTimeout(() => {
          red1.classList.remove("active");
          blue2.classList.remove("active");
          green3.classList.remove("active");
          yellow4.classList.remove("active");
        }, 200); //This is for the duration of the pulse
      }, i * 400); // For the interval between each pulse
    }
  }


