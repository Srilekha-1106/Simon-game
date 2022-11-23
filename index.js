var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var i = 0;
var start = false;
$(document).keypress( function(){
    if (!start)//not equal to false for the first time it is not true it is equal to false.
    {
    $(".title").text("level "+i);
    nextSequence();
    start = true;
    }
});
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    i ++;
    userClickedPattern = [];
    $(".title").text("level "+i);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // checkAnswer();
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed");
    },100);
}
function checkAnswer(current){
    if (gamePattern[current]== userClickedPattern[current])
    {
        console.log("Success");
    if (userClickedPattern.length == gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    }
    else{
        console.log("Wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        },200);
        $(".title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        startOver();
    }
}
function startOver(){
    i=0;
    gamePattern = [];
    start = false;
}
