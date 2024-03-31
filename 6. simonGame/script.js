let strictMode = false;
let powerOn = false;
const sequence = [];
let userSequence = [];
let level = 1;
const levelCount = document.querySelector('.level-count');
// console.log(levelCount)

//starting
function startGame(){
    sequence.length = 0;
    userSequence.length = 0;
    level = 1;
    levelCount.textContent = level;
    nextRound();
    document.getElementById("start-btn").disabled = true;
    document.getElementById("power-btn").disabled = false;
}
//moving to next round
function nextRound(){
    addToSequence();
    playSequence();
}
//sequence generated by game
function addToSequence(){
    const randomColor = Math.floor(Math.random() * 4) + 1;
    // console.log(randomColor)
    sequence.push(randomColor);
}
//showing the sequence generated
function playSequence(){
    let i = 0;
    const intervalId = setInterval(() => {
        highlightButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
            enableButtons();
        }
    }, 1000);
}
function handleClick(button){
    if(powerOn){
        
        const userColor = button.getAttribute("data-color");
        
        userSequence.push(Number(userColor));

        //coloring the button pressed
        highlightButton(userColor);

        if (!checkSequence()) {
            if (strictMode) {
                alert( `Game over! Press Start to retry from level 1. \nFINAL SCORE: ${level}`);
                togglePower();
                startGame();
            }else{
                alert(`Wrong sequence! Press Start to try again from current level.\nFINAL SCORE: ${level}`);
                userSequence = [];
                document.getElementById('power-btn').addEventListener('click', () => {
                    playSequence();
                })
            }
        }else if ( userSequence.length === sequence.length){
            userSequence = [];
            level++;
            levelCount.textContent = level;
            // Can change level as per convenience or if we want the game to continue indefinetely, can omit if-else condition
            if (level <= 20){
                setTimeout( () => nextRound(), 1000);
            }else {
                alert("Congrats! You Won!");
                startGame();
            }
        }
    }
}
function checkSequence() {
    for (let i = 0; i < userSequence.length; i++){
        if (userSequence[i] !== sequence[i]){
            return false;
        }
    }
    return true;
}
//showing 0.3s each color changed of the sequence query
function highlightButton(color) {
    const button = document.querySelector(`[data-color="${color}"]`);

    if ( Number(color) == 1) {
        button.style.backgroundColor = 'lightgreen';
    }
    else if ( Number(color) == 2) {
        button.style.backgroundColor = 'tomato';
    }
    else if ( Number(color) == 3) {
        button.style.backgroundColor = 'yellow';
    }
    else if ( Number(color) == 4) {
        button.style.backgroundColor = 'lightskyblue';
    }
    setTimeout(() => {
        button.attributes.removeNamedItem('style');
    }, 300);
}

//enabling usage of buttons
function enableButtons(){
    const buttons = document.querySelectorAll('.simon-btn');
    buttons.forEach( button => button.removeAttribute('disabled'));
}
//disabling buttons
function disableButtons(){
    const buttons = document.querySelectorAll('.simon-btn');
    buttons.forEach( button => button.setAttribute('disabled', 'true'));
}
//strict mode
function toggleStrictMode() {
    strictMode = !strictMode;
}

//starting the game
function togglePower(){
    powerOn = !powerOn;
    if (powerOn){
        startGame();
        enableButtons();
        document.getElementById("start-btn").disabled = false;
    }else{
        userSequence = [];
        disableButtons();
        document.getElementById("start-btn").disabled = true;
    }
}