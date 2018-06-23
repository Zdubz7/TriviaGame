$(document).ready(function () {


    // Creates the start function of the opening screen and start button.
    function openingScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Begin U.S. President Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    openingScreen();

    // Within body on click function start-button begins the game

    $("body").on("click", ".start-button", function (game) {
        // This function tests issues on Github.
        game.preventDefault();
        touchSound.play();
        createHTML();
        clockWrapper();

    }); // This function closes the start button.

    $("body").on("click", ".answer", function (game) {
        // This functin creates an alert sound that the player has selectedAnswer and if selectedAnswer = correctanswers a point is added to the correct answer section and logged  
        touchSound.play();
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            // This function clears the clock and createsWin for the user.

            clearInterval(theClock);
            createWin();
        } else {
            // If the answer was incorrectly answered the clock is cleared and a createLoss is created and logged.
            clearInterval(theClock);
            createLoss();
        }
        
    }); // This function creates the sound of the restart button and restarts the game.

    $("body").on("click", ".reset-button", function (game) {
        touchSound.play();
        restartGame();
    }); // This function closes the resetGame function

}); //  This function closes the j-query Wrapper.

// This function generates a point of the clock runs to zero and the user didnt answer the question correctly or incorrectly. 
function createLossDuetoClockZero() {
    unansweredCount++;
    // gameHTML in this case 
    gameHTML = "<p class='text-center timer-p'>Current Time Remaining For Answer: <span class='timer'>" + clock + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
    $(".mainArea").html(gameHTML);
    //  This var is the waiting time between unanswered questions transitioning to the next question
    setTimeout(wait, 2000);
}

// This function creates a win and adds a point that is stored and displayed as a win at the end of the game.
function createWin() {
    correctCount++;
    gameHTML = "<p class='text-center timer-p'>Current Time Remaining For Answer: <span class='timer'>" + clock + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageCase[questionCounter];
    $(".mainArea").html(gameHTML);
    //  This var is the waiting time between correctly answered questions.
    setTimeout(wait, 2000);
}

// This function creates a loss and adds a point that is stored and diplayed in losses at the end of the game. 
function createLoss() {
    incorrectCount++;
    // This function reveals the img/x function when you get an answer wrong.
    gameHTML = "<p class='text-center timer-p'>Current Time Remaining For Answer: <span class='timer'>" + clock + "</span></p>" + "<p class='text-center'>Sorry Incorrect Answer! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png'>";
    $(".mainArea").html(gameHTML);
    //  This var is the waiting time between incorectly answered questions.
    setTimeout(wait, 2000);
}

// This generateHTML function houses the created questions as well as the 4 answer options where only one of the answers is right and the other 3 answers are wrong.
function createHTML() {
    gameHTML = "<p class='text-center timer-p'>Current Time Remaining For Answer: <span class='timer'>30</span></p><p class='text-center'>" + questionCase[questionCounter] + "</p><p class='first-answer answer'>A. " + answerCase[questionCounter][0] + "</p><p class='answer'>B. " + answerCase[questionCounter][1] + "</p><p class='answer'>C. " + answerCase[questionCounter][2] + "</p><p class='answer'>D. " + answerCase[questionCounter][3] + "</p>";
    $(".mainArea").html(gameHTML);
}

// This function turns off the clock at the results screen
function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        createHTML();
        clock = 30;
        // clockWrapper houses the clock time.
        clockWrapper();
    } else {
        lastScreen();
    }
}

// This function tally's a loss due to the clock running out. 
function clockWrapper() {
    theClock = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (clock === 0) {
            clearInterval(theClock);
            createLossDuetoClockZero();
        }
        if (clock > 0) {
            clock--;
        }
        $(".timer").html(clock);
    }
}

// this function calls the final results after going through all 8 questions in the game and gives the user the option to restart the game. 
function lastScreen() {
    gameHTML = "<p class='text-center timer-p'>Current Time Remaining For Answer: <span class='timer'>" + clock + "</span></p>" + "<p class='text-center'>Trivia Complete! Here Are Your Results!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCount + "</p>" + "<p>Wrong Answers: " + incorrectCount + "</p>" + "<p>Unanswered: " + unansweredCount + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Click Here To Play Again!</a></p>";
    $(".mainArea").html(gameHTML);
}

// all function counts and the clock in the game are reset by function restartGame.
function restartGame() {
    questionCounter = 0;
    correctCount = 0;
    incorrectCount = 0;
    unansweredCount = 0;
    clock = 30;
    createHTML();
    clockWrapper();
}

// where the title of the game and the button to begin the game are housed.
var startScreen;

var gameHTML;
// The time the user has to answer each question provided.
var clock = 30;

// var questionCases are a list of questions in sequential order in the game.
var questionCase =

    ["Who was the only President to serve more than two terms?",
        "Who was the only President to serve two non-consecutive terms?",
        "Who was the oldest elected President?",
        "Who was the first President to live in the White House?",
        "Who was the first President born outside the contiguous United States?",
        "Before the Twelfth Amendment was passed in 1804, how was the Vice President determined?",
        "Which U.S. President signed the treaty to purchase Alaska from Russia?",
        "Who was the first President to appear on TV?"
    ];

// questionCase in this case links the provided question to the 4 answer options 
var answerCase =


    [
        ["Franklin D. Roosevelt",
            "Theodore Roosevelt",
            "George Washington",
            "Ulysses S. Grant"
        ],

        ["Ronald Reagan",
            "Grover Cleveland",
            "Woodrow Wilson",
            "Theodore Roosevelt"
        ],

        ["Dwight D. Eisenhower",
            "James Buchanan",
            "Donald Trump",
            "Ronald Reagan"
        ],

        ["George Washington",
            "Thomas Jefferson",
            "John Adams",
            "Andrew Jackson"
        ],

        ["William Howard Taft",
            "Franklin Pierce",
            "Benjamin Harrison",
            "Barack Obama"
        ],

        ["The Presidential candidate receiving the second-largest number of electoral votes",
            "There was no official Vice Presidents before 1804",
            "Appointed by the president",
            "President and Vice President were voted on seperately"
        ],

        ["James Buchanan",
            "Andrew Johnson",
            "Ulysses S. Grant",
            "Andrew Jackson"
        ],

        ["Harry S. Truman",
            "John F. Kennedy",
            "Dwight D. Eisenhower",
            "Franklin D. Roosevelt"
        ]
    ];

// These images appear when a question is answered correctly.
var imageCase = ["<img class='center-block img-right' src='assets/images/franklindroosevelt.png'>",
    "<img class='center-block img-right' src='assets/images/grovercleveland.png'>",
    "<img class='center-block img-right' src='assets/images/donaldtrump.png'>",
    "<img class='center-block img-right' src='assets/images/johnadams.png'>",
    "<img class='center-block img-right' src='assets/images/barackobama.png'>",
    "<img class='center-block img-right' src='assets/images/electoralvotes.png'>",
    "<img class='center-block img-right' src='assets/images/andrewjohnson.png'>",
    "<img class='center-block img-right' src='assets/images/franklinlast.png'>"
];

// These are the correct answers displayed after the question is answered correctly, incorrectly, or unanswered in order of appearance in the questionCase.
var correctAnswers = ["A. Franklin D. Roosevelt",
    "B. Grover Cleveland",
    "C. Donald Trump",
    "C. John Adams",
    "D. Barack Obama",
    "A. The Presidential candidate receiving the second-largest number of electoral votes",
    "B. Andrew Johnson",
    "D. Franklin D. Roosevelt"
];

var questionCounter = 0;
var selecterAnswer;

var theClock;
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;
// This is the variable that causes the UX styling when the user clicks a button. 
var touchSound = new Audio("assets/images/button-click.wav");