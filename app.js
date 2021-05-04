const card = document.querySelectorAll('.card');
const animal = document.querySelectorAll('.animal');
const score = document.querySelector('.score');
const attempt = document.querySelector('.attempt');
const display = document.querySelector('.guessDisplay');

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
shuffle(nums);

//Use randomised nums array to set the img path of a random animal
for(let i = 0; i < nums.length; i++){
    let randImg = nums[i];
    animal[i].setAttribute('src', `img/${imgArr[randImg]}`);
};

//Adds an event listener to each card
for(let i = 0; i < card.length; i++){
    card[i].addEventListener('click', function(){
        card[i].classList.toggle('card');
        animal[i].classList.toggle('animalOn');
        animal[i].parentElement.classList.toggle('unclick');
        guessArr.push(animal[i]);
        answerCheck();
    })
};

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


