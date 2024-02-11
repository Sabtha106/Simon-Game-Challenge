var level;
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = [];
var userClickedPattern = [];



//  randomPattern function
function randomPattern(){
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);
    return randomNumber; 
}


// next nextSequence
function nextSequence(){
    var nextColor = buttonColours[randomPattern()];
    randomChosenColour.push(nextColor);
    playSound(nextColor);
    $("h1").text("Level 1");
    return randomChosenColour;
}



// Detecting button pressed.
    var numberOfButtons = buttonColours.length;
    for (let i = 0; i < numberOfButtons; i++) {
        
        $(".btn")[i].addEventListener("click", function(){
            if(randomChosenColour.length > 0){
                
                var userChosenColor = this.getAttribute("id");
                userClickedPattern.push(userChosenColor);
                playSound(userChosenColor);
                animatePress(userChosenColor);
                checkAnswer(userChosenColor);
                
            }else{
                var userChosenColor = this.getAttribute("id");
                playSound(userChosenColor);
                wrongSound();
            
            }
            
        });
    }


// Play sound
function playSound(color){

    switch (color) {
        case "red":
            var redSound = new Audio("sounds/red.mp3");
            redSound.play();
            fnBlink(color);
            break;

        case "blue":
            var blueSound = new Audio("sounds/blue.mp3");
            blueSound.play();
            fnBlink(color);
            break;

        case "green":
            var greenSound = new Audio("sounds/green.mp3");
            greenSound.play();
            fnBlink(color);
            break;

        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3");
            yellowSound.play();
            fnBlink(color);
            break;
    
        default:
            break;
    }
}

// Wrong sound function 
function wrongSound(){
    var wSound = new Audio("sounds/wrong.mp3");
    wSound.play();
    $("body").addClass("game-over");
   setTimeout(function(){
    $("body").removeClass("game-over");
   }, 200);
    

   $("h1").text("Game Over, Press Any Key to Restart");
    
    
}

// Blink Function (fadeIn/ fadeOut)
function fnBlink(button) {
    $("." + button).fadeOut(200);
    $("." + button).fadeIn(200);
    }   


// Start a game
document.addEventListener("keydown", function(event){ 
    if(randomChosenColour.length < 1){
        nextSequence();
        
    }
});

// animate Press 
function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);
}



// Check answer (compare arrays)
function checkAnswer(currentLevel){
    

    let a = randomChosenColour.lastIndexOf(currentLevel);
    let b = userClickedPattern.lastIndexOf(currentLevel);
    
    
        if(a == b){

            var c = randomChosenColour.toString();
            var d = userClickedPattern.toString();
            
            if(c == d){
                console.log("success array match");
                setTimeout(function(){
                    nextSequence();
                    userClickedPattern = [];
                    $("h1").text("Level" + " " + randomChosenColour.length);
            }, 1000);
            }
            
        }
        else{
            console.log("wrong");
        }
        
    
    
     
}




