
const MAXGUESSES = 6; // constant. for max attempts to guess the secret number
var secretNum = 0;
var usrGuess;
var hasWon = false;
var guessesLeft = MAXGUESSES;
var guessCount = 0; // tracks the number of guesses the user has made

// page 01 message/image output, allows javaScript to output messages/images to specific IDs  
var page01 = document.getElementById("page01");
var leftBox = document.getElementById("leftBox");
var rightBox = document.getElementById("rightBox");
var lowerBox = document.getElementById("lowerBox");

// page 02 message/image output, allows javaScript to output messages/images to specific IDs  
var page02 = document.getElementById("page02");
var expandBox2 = document.getElementById("expandBox2");
var leftBox2 = document.getElementById("leftBox2");
var rightBox2 = document.getElementById("rightBox2");
var lowerBox2 = document.getElementById("lowerBox2");

// page 03 message/image output, allows javaScript to output messages/images to specific IDs  
var page03 = document.getElementById("page03");
var expandBox3 = document.getElementById("expandBox3");
var leftBox3 = document.getElementById("leftBox3");
var rightBox3 = document.getElementById("rightBox3");
var lowerBox3 = document.getElementById("lowerBox3");
var remainOut = document.getElementById("remaining");
var instOut = document.getElementById("instruct");
var pastGOut =  document.getElementById("pastGuesses");

// in game buttons
var idButton = document.getElementById("button"); // this line links the id="button from the HTML div so JavaScript can change/control"
var idButton2 = document.getElementById("button2");
var idButton3 = null;
var idButton4 = document.getElementById("restart_btn2");
var idInput = document.getElementById("numInput"); // text box input, where the user can enter their guess
var idBtn = document.getElementById("enterButton"); // enter button for the user to submit their guess

leftBox.innerHTML = '<img src="images/batsignal.jpg" alt="The Batsignal shining in the Night sky." />'; // sets the image in the left most <div>.  
rightBox.innerHTML = '<img src="images/batman-1989-batsignal.jpg" alt="The Batman seeing the Batsignal" />';
lowerBox.innerHTML = '<img src="images/Batmobile_Animated.jpg" alt="The Batmobile speeding to Gotham city hall." />';






  function playGame(){
    page01.style.display = "none"; // hides <div id="page01"> by adding a CSS style: display:none;
    page02.style.display = "block";
    leftBox2.innerHTML = '<img src="images/riddler_06.png" alt="The Riddler character image." />';
    rightBox2.innerHTML = '<img src="images/cityhall_night.jpg" alt="The Riddler character image." />';
    lowerBox2.innerHTML = '<img src="images/boilerTNT_01.jpg" alt="The Riddler character image." />';
    expandBox2.innerHTML = '<img src="images/bubble_tall.png" alt="The Riddler character image." />'; // expandBox2 is used for displaying comic book style text buble over other images on the page
  }
  function nextPage(){ 
    page02.style.display = "none";
    page03.style.display = "block";
    runGame(); // calls run game function to control game flow
  }
  function playAgain(){
    page01.style.display = "block";
    page03.style.display = "none";
    reset(); // sets/resets game varables for new game or first game
  }
  
  function buttonHandler(){
    usrGuess = idInput.value; // .value gets the data in the text field by id
    usrGuess = parseInt(usrGuess, 10); // input is allwase a string must convert to int using base 10

    if(usrGuess < 1 || usrGuess > 50){ // bounds checking of user input
      instOut.innerHTML = "Please input ONLY NUMBERS between 1 to 50<br />"; // output message informing the user that their input is out of range
    }else if (isNaN(usrGuess)){ // correct input type checking. eg number VS non-numbers
      instOut.innerHTML = "That's not a number. Please input ONLY NUMBERS between 1 to 50<br />";
    }else{
      document.getElementById("numInput").value = ""; // clears user input apon user guess is in range (1-50) and ia a number
      runGame(); // function call to game play mechanics
    }
  }
  
  

  
  function runGame(){
    expandBox3.innerHTML = ""; //// FOR TESTING: cheat puts the secretNum in upper left of game window, to enable set equil to secretNum ////
    
    instOut.innerHTML = 'Instructions: Your goal is to guess the disarm code in 6 guesses or less. Enter your guess into the bomb keypad above and then press enter in the lower right of the bomb keypad.';

    if(usrGuess == secretNum && usrGuess > 0){ // evaluates if usrGuess is equil to secretNum
      hasWon = true;
      rightBox3.style.backgroundImage = 'url("images/explosive_digital_close_disarmed.jpg")'; // sets css style background image for id="rightBox3"
      leftBox3.innerHTML = '<img src="images/locked_up.jpg" alt="The Riddler character behind bars image." />';
      expandBox3.innerHTML = '<p>The Disarm code was: ' + secretNum + '</p><img src="images/WOW.png" alt="WOW! image." /><button id="restart_btn">Play again</button>'; // change to cool winning screen or someting
      expandBox3.onclick = playAgain;
      idButton3 = document.getElementById("restart_btn"); 
      idButton3.onclick = playAgain; // button allows user to reset the game so they can play again
      
    } else if (usrGuess > secretNum && usrGuess > 0){ // evaluates if usrGuess is greater than the secretNum
      guessCount++;
      pastGOut.innerHTML += guessCount + ') Your guess of ' + usrGuess + ' was too high.<br />'; // informs the user that their guess was too high. out put to div id="pastGuesses"
      guessesLeft--;
    } else if (usrGuess < secretNum && usrGuess > 0){ // evaluates if guess is lower than the secretNum
      guessCount++;
      pastGOut.innerHTML += guessCount + ') Your guess of ' + usrGuess + ' was too low.<br />';
      guessesLeft--; // decrements number of guesses left by one
    }
    
    remainOut.innerHTML = "Number of guesses remaining: " + guessesLeft;
   
    if (guessesLeft <= 0 && !hasWon){ // handles the Riddler escaping images
      leftBox3.innerHTML = '<img src="images/riddler_00.png" alt="The Riddler character image." />';
      rightBox3.style.backgroundImage = 'url("images/explosive_digital_close_00.jpg")';
      expandBox3.innerHTML = '<p>The Disarm code was: ' + secretNum + '</p><img src="images/KABOOM.png" alt="KABOOM image." /><button id="restart_btn">Play again</button>';
      expandBox3.onclick = playAgain;
      idButton3 = document.getElementById("restart_btn"); // links id="restart_btn" to js idButton3 so butten will be useable
      idButton3.onclick = playAgain; // button allows user to reset the game so they can play again
      reset();

    } else if (guessesLeft <= 1 && !hasWon){ 
      leftBox3.innerHTML = '<img src="images/riddler_01.png" alt="The Riddler character at the exit." />';
      rightBox3.style.backgroundImage = 'url("images/explosive_digital_close_01.jpg")';
      //expandBox3.innerHTML = ; // outputs ridelers final good bye message to batman inside expandBox3
    } else if (guessesLeft <= 2 && !hasWon){
      leftBox3.innerHTML = '<img src="images/riddler_02.png" alt="The Riddler character close to the exit." />';
      rightBox3.style.backgroundImage = 'url("images/explosive_digital_close_02.jpg")'; // changes image of bomb cound down clock from 3 to 2 
      //expandBox3.innerHTML = 
      
    } else if (guessesLeft <= 3 && !hasWon){ // updates Riddlers movement image closer to the exit, also updates mocking message to Batman/player
      leftBox3.innerHTML = '<img src="images/riddler_04.png" alt="The Riddler character halfway to the exit." />';
      rightBox3.style.backgroundImage = 'url("images/explosive_digital_close_03.jpg")';
      //expandBox3.innerHTML = 
      
    }else if (guessesLeft <= 4 && !hasWon){ // checks if number of guesses is lessthan or equil to 4 and the player has not won if both are true then the code below is run
      leftBox3.innerHTML = '<img src="images/riddler_04.png" alt="The Riddler character halfway to the exit." />';
      rightBox3.style.backgroundImage = 'url("images/explosive_digital_close_04.jpg")'; // changes image of bomb cound down clock from 5 to 4 
      //expandBox3.innerHTML = 
      
    } else if(guessesLeft <= 5 && !hasWon){
      leftBox3.innerHTML = '<img src="images/riddler_06.png" alt="The Riddler character far from the exit." />';
      rightBox3.style.backgroundImage = 'url("images/explosive_digital_close_05.jpg")';
      //expandBox3.innerHTML = ;// Riddler's mocking output message to expandBox3
      
    }else if (guessesLeft <= MAXGUESSES && !hasWon){ 
      leftBox3.innerHTML = '<img src="images/riddler_06.png" alt="The Riddler character far from the exit." />'; // initial mocking message of the Riddler to Batman/player
      rightBox3.style.backgroundImage = 'url("images/explosive_digital_close_06.jpg")';
      //expandBox3.innerHTML = 
    }
  }

  
  function reset(){ // sets/resets game varables for new game
    hasWon = false;
    secretNum = 0;
    guessesLeft = MAXGUESSES;
    usrGuess = 0;
    secretNum = Math.floor(Math.random() * 50) +1; // random number generator for number to be guessed in range of 1-50
    document.getElementById("numInput").value = ""; // clears the value in the textbox after the enter button is pressed
    pastGOut.innerHTML = 'Guesses you have made:<br />';
    guessCount = 0;
  }
  
  reset(); 
  idButton.onclick = playGame;
  lowerBox.onclick = playGame;
  idButton2.onclick = nextPage;
  lowerBox2.onclick = nextPage;
  idBtn.onclick = buttonHandler;
  idButton4.onclick = playAgain;
  
  



 
