const score = document.querySelector('.score');
const attempt = document.querySelector('.attempt');
const display = document.querySelector('.guessDisplay');
const levels = document.querySelector('#levels');
const cardsDiv = document.querySelector('.cards');
const select = document.querySelector('select');

let guessArr = [];
let playerScore = 0;
let playerAttempt = 0;

//Listen for level changes
select.addEventListener('change', function(){
    clearCurrLevel();
    levelSelect(levels);
})

//Clears current level cards
const clearCurrLevel = () => {
    while(cardsDiv.childNodes.length >= 1){
        cardsDiv.removeChild(cardsDiv.firstChild);
    }
}

//loop through array randomly and set attribute of animals
const imgArr = ['bear.png', 
                'bear.png', 
                'deer.png', 
                'deer.png', 
                'fox.png', 
                'fox.png', 
                'lion.png', 
                'lion.png', 
                'penguin.png', 
                'penguin.png', 
                'rabbit.png', 
                'rabbit.png'];
let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

let shuffle = (arr) => {
    for(let i = arr.length - 1; i >= 1; i--){
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

//Created cards once level is selected
const card = document.querySelectorAll('.card');
const animal = document.querySelectorAll('.animal');

//Create the number of cards depending on the level selected
const createCards = (numarr, imgarr) => {
    for(let i = 0; i < numarr.length; i++){
        const div = document.createElement('div');
        div.classList.add('card');
        const img = document.createElement('img');
        img.classList.add('animal');
        let randImg = numarr[i];
        img.setAttribute('src', `img/${imgarr[randImg]}`);
        div.append(img);
        cardsDiv.append(div);
    }
};

//Level selector
const levelSelect = (lvlSelect) => {
    if(lvlSelect.value === '1'){
        level1();
    } else if (lvlSelect.value === '2'){
        level2();
    } else if (lvlSelect.value === '3'){
        level3();
    } else {
        level4();
    }
}

//Level functions
const level1 = () => {
    const lvl1arr = nums.slice(0,4);
    const lvl1img = imgArr.slice(0,4);
    shuffle(lvl1arr);
    createCards(lvl1arr, lvl1img);
}

const level2 = () => {
    const lvl2arr = nums.slice(0,6);
    const lvl2img = imgArr.slice(0,6);
    shuffle(lvl2arr);
    createCards(lvl2arr, lvl2img);
}

const level3 = () => {
    const lvl3arr = nums.slice(0, 10);
    const lvl3img = imgArr.slice(0, 10);
    shuffle(lvl3arr);
    createCards(lvl3arr, lvl3img);
}

const level4 = () => {
    const lvl4arr = nums;
    const lvl4img = imgArr;
    shuffle(lvl4arr);
    createCards(lvl4arr, lvl4img);
}

//Listen for clicks on added cards
cardsDiv.addEventListener('click', function(event){
    if(event.target.classList.contains('card')){
        event.target.children[0].classList.toggle('animalOn');
        event.target.classList.toggle('card');
        event.target.classList.toggle('unclick');
        console.log(guessArr.push(event.target.children[0]));
        answerCheck();
    }
});

//Level 1 loaded as the default when page opens
window.onload = level1();

//Check the two cards when both answers are added to the array
const answerCheck = () => {
    if(guessArr.length === 2){
        if(guessArr[0].src === guessArr[1].src){
            for(let i = 0; i < guessArr.length; i++){
                guessArr[i].classList.add('correctAnimal');
                guessArr[i].classList.remove('card');
                guessArr[i].classList.remove('animalOn');
                guessArr[i].parentElement.classList.add('unclick');
            }
            correct();
        } else {
            incorrect();
        }
    }
};

//If the two cards match
const correct = () => {
    playerScore++;
    score.textContent = playerScore;
    display.textContent = 'Correct!';
    guessArr.splice(0);
};

//If the two cards don't match
const incorrect = () => {
    playerAttempt++;
    attempt.textContent = playerAttempt;
    display.textContent = "Incorrect - Guess again!";
    cardReset();
    guessArr.splice(0);
};

//Reset the cards - SORT THIS OUT!
const cardReset = () => {
    setTimeout(function() {
        for(let i = 0; i < guessArr.length; i++){
            //I don't think this needs the if statement as the guessArr is cleared after each turn anyway
            // Use the below as reference to update this function
            // event.target.children[0].classList.toggle('animalOn');
            // event.target.classList.toggle('card');
            // event.target.classList.toggle('unclick');
            if(guessArr[i].classList.contains('animalOn')){
                guessArr[i].classList.toggle('animalOn');
                guessArr[i].classList.toggle('card');
                guessArr[i].parentElement.classList.toggle('unclick');
            }
        display.textContent = "";
        }
    }, 1000)
};

//TO DO - level functionality
//Change the level1,2,3 etc to an object?
//seperate functions into different file
//Add the rest of the game function to the code

