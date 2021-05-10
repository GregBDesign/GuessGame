const card = document.querySelectorAll('.card');
const animal = document.querySelectorAll('.animal');
const score = document.querySelector('.score');
const attempt = document.querySelector('.attempt');
const display = document.querySelector('.guessDisplay');
const cardsHolder = document.querySelector('.cards');
const levels = document.querySelector('#levels');
const select = document.querySelector('select');

let guessArr = [];
let playerScore = 0;
let playerAttempt = 0;

//loop through array randomly and set attribute of .animal
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
    for(let i = arr.length - 1; i >= 1; i -= 1){
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

//Use randomised nums array to set the img path of a random animal
// for(let i = 0; i < nums.length; i++){
//     let randImg = nums[i];
//     animal[i].setAttribute('src', `img/${imgArr[randImg]}`);
// };

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

//Reset the cards
const cardReset = () => {
    setTimeout(function() {
        for(let i = 0; i < animal.length; i++){
            if(animal[i].classList.contains('animalOn')){
                animal[i].classList.toggle('animalOn');
                card[i].classList.toggle('card');
                animal[i].parentElement.classList.toggle('unclick');
            }
        display.textContent = "";
        }
    }, 1000)
};

//TO DO - level functionality
//make the divs depending on which level is selected
//Use .slice to create an array
//Change the level1,2,3 etc to an object?


const levelSelect = (lvlSelect) => {
    if(lvlSelect.value === '1'){
        level1();
    } else if (lvlSelect.value === '2'){
        console.log('level 2');
    } else if (lvlSelect.value === '3'){
        console.log('level 3');
    } else {
        console.log('level 4');
    }
}

select.addEventListener('change', function(){
    levelSelect(levels);
})

const level1 = () => {
    const lvl1arr = nums.slice(0,4);
    const lvl1img = imgArr.slice(0,4);
    shuffle(lvl1arr);
    createCards(lvl1arr, lvl1img);
    listenOnCards();
}

const createCards = (numarr, imgarr) => {
    for(let i = 0; i < numarr.length; i++){
        const div = document.createElement('div');
        div.classList.add('card');
        const img = document.createElement('img');
        img.classList.add('animal');
        let randImg = numarr[i];
        img.setAttribute('src', `img/${imgarr[randImg]}`);
        div.append(img);
        cardsHolder.append(div);
    }
};

let cardsInHolder = cardsHolder.childNodes;

//Adds an event listener to each card
//TO DO: SORT THIS LISTENER OUT?! Pass in imgarrays as params
const listenOnCards = () => {
    for(let i = 1; i <= cardsInHolder.length; i++){
        cardsInHolder[i].addEventListener('click', function(){
            // cardsInHolder[i].classList.toggle('card');
            // animal[i].classList.toggle('animalOn');
            // animal[i].parentElement.classList.toggle('unclick');
            // guessArr.push(animal[i]);
            // answerCheck();
            alert('works');
        })
    };
}
