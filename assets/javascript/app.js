// Variables

var questionArray = ["What Pokemon is number one on the National PokeDex?", "What type is Pikachu?", "Who is the first gym leader in the Kanto region?", "The Fairy type is strong against what types?", "Who is the champion of the Sinnoh region?", "What is Arceus' National Pokedex number?", "Which of the following Pokemon can Mega-Evolve?"];
var answerArray = [["Pikachu", "Squirtle", "Bulbasuar", "Chespin"], ["Thunder", "Lightning", "Electric", "Zappy"], ["Brock", "Misty", "Giovanni", "Oak"], ["Dragon", "Fighting", "Dark", "All of the above"], ["Cynthia", "Blue", "Red", "Diantha"], ["349", "493", "439", "394"], ["Charizard", "Greninja", "Hydreigon", "All of the above"]];
var correctAnsArray = ["C. Bulbasuar", "C. Electric", "A. Brock", "D. All of the above", "A. Cynthia", "B. 493", "A. Charizard"];
var imageArray = [];  // Images will go in here later...
var questionNumber = 0;
var timer = 30;
var theTimer;
var rightAns = 0;
var wrongAns = 0;
var blankAns = 0;
var userAnswer;
var gameHtml;
var gameStart;

// Events
$(document).ready(function(){
    function start(){
        gameStart = "<p class='text-center main-button-container'><a id='start-game' class='btn btn-warning btn-block' href='#' role='button'>Start Quiz</a></p>";
        $(".quiz").html(gameStart);
    }

    start();

    $("body").on("click", "#start-game", function(event){
        answerChoices();
        countdown();
    })

    $("body").on("click", ".answer", function(){
        userAnswer = $(this).text();
        if(userAnswer === correctAnsArray[questionNumber]){
            clearInterval(theTimer);
            right();
        }
        else{
            clearInterval(theTimer);
            wrong();
        }
    })

    $("body").on("click", ".reset-button", function(){
        reset();
    })

})

// Functions

function reset(){
    rightAns = 0;
    wrongAns = 0;
    blankAns =0;
    questionNumber = 0;
    timer = 30;

}

function right(){
    rightAns++;
    gameHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnsArray[questionNumber] + "</p>";
    $(".quiz").html(gameHtml);
    setTimeout(wait, 4000);
}

function wrong(){
    wrongAns++;
    gameHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnsArray[questionNumber] + "</p>";
    $(".quiz").html(gameHtml);
    setTimeout(wait, 4000);
}

function timeout(){
    blankAns++;
    gameHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Time's up!  The correct answer was: " + correctAnsArray[questionNumber] + "</p>";
    $(".quiz").html(gameHtml);
    setTimeout(wait, 4000);
}

function answerChoices(){
    gameHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionNumber] + "</p><p class='first-answer answer'>A. " + answerArray[questionNumber][0] + "</p><p class='answer'>B. " + answerArray[questionNumber][1] + "</p><p class='answer'>C. " + answerArray[questionNumber][2] + "</p><p class='answer'>D. " + answerArray[questionNumber][3]+"</p>";
    $(".quiz").html(gameHtml);
}

function countdown(){
    theTimer = setInterval(thirtySeconds, 1000);
    function thirtySeconds(){
        if (timer === 0){
            clearInterval(theTimer);
            timeout();
        }
        if (timer > 0){
            timer--;
        }
        $(".timer").html(timer);
    }
}

function endScreen(){
    gameHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + rightAns + "</p>" + "<p>Wrong Answers: " + wrongAns + "</p>" + "<p>Unanswered: " + blankAns + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-block reset-button' href='#' role='button'>Restart the Quiz!</a></p>";
    $(".quiz").html(gameHtml);
}

function wait(){
    if (questionNumber < 6){
        questionNumber++;
        answerChoices();
        timer = 30;
        countdown();
    }
    else {
        endScreen();
    }
}


