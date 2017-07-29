$(document).ready(function() {


    $("#questionDead").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    function countDown() {
        $(".pickAnswer").click(function() {
            $(this).data("clicked", true);
        });
        var t = 29;
        var myInterval = setInterval(function() {

            if (t < 10) {
                $("#timerSeconds").html("0" + t); 
                $(".pickAnswer").on("click", function() {   
                    clearInterval(myInterval);               
                })
            } else {
                $("#timerSeconds").html(t);
                 $(".pickAnswer").on("click", function() {   
                    clearInterval(myInterval);               
                })
      
        
            }

            if (t === 0) {           
                unansweredCounter++;
                clearInterval(myInterval);  
                t = 29;
                resetGame();

                
            } else {
                t--;
            }
        }, 950);
    }

    var questions = [
        
        {
            "question": "Who Plays Stephen 'Flyboy' Andrews?",
            "choices": ["David Emge", "Ken Foree", "Scott Reingiger", "David Early"],
            "answer": 0
        },
        
        {
            "question": "Who Played Peter Washington?",
            "choices": ["David Early", "David Emge", "Ken Foree", "Scott Reingiger"],
            "answer": 2
        },
        
        {
            "question":  "Who Played Roger 'Trooper' DeMarco?",
            "choices": [ "Ken Foree", "Scott Reingiger", "David Early", "David Emge"],
            "answer": 1
        },
        
        {
            "question": "Who Played Francine 'Fran' Parker?",
            "choices": ["Gaylen Ross", "Sarah McMichaels", "Summer Smith", "Rose Gringrish"],
            "answer": 0
        },
        
        {
            "question": "Who Directed the Film?",
            "choices": ["Gary King", "Edgar Wright", "George A. Romero", "Danny Boyle"],
            "answer": 2
        },

        {
            "question": "What is the real name of the mall featured in the film?",
            "choices": ["The Mall of America", "Monroeville Mall", "Ambience Mall", "The Mall at Short Hills"],
            "answer": 1
        },

        {
            "question": "Who did the special effects and was a biker in the climax?",
            "choices": ["Rollie Tyler", "Tony Block", "Tom Savini", "J.T. Hague"],
            "answer": 2
        },

        {
            "question": "How was the film supposed to end?",
            "choices": ["Exactly as it did.", "Peter, Fran, and Flyboy fight off the zombies and bikers and retaking the mall.", "Fran commits suicide by sticking her head in the helecopter blades after Peter commits suicide by gun.", "The mall is nuked by the remaing goverment killing everyone around the mall."],
            "answer": 2
        },

        {
            "question": "What was the working time for the film?",
            "choices": ["Dawn of the Living Dead", "Day of the Living Dead", "Mall of the Living Dead", "Living in a Dead Mall"],
            "answer": 0
        },

        {
            "question": "The director of this film passed away, when did he die?",
            "choices": ["January 24, 1981", "March 6th, 2014", "Decemeber 10th, 2010", "July 16th, 2017"],
            "answer": 3
        }
    ];


    function postQuestion(post) {

        if (currentQuestionIndex < questions.length) {
            $("#question").remove();
            $(".pickAnswer").remove();
            countDown();
            $("#questionContainer").append("<div id='question'>" + questions[post].question + "</div>");
            for (var i = 0; i < questions[post].choices.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("numberIndex", i).text(questions[post].choices[i]);
                $("#choices").append(newDiv);
            }


        } else {
            resetGame();
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr("numberIndex");
                userChoice = parseInt(userChoice);

            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        
        clearInterval();
        $("#gameMessage").empty()
        $("#questionContainer").show();
        $("#choices").show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {

        $("#questionContainer").hide();
        $("#choices").hide();
        $("#timer").hide();



        $("#gameMessage").append("<h1><bold>The Game Will Restart in 5 Seconds</bold></h1>");
        $("#gameMessage").append("<h4>Correct Answers: " + correctCounter + "</h4>");
        $("#gameMessage").append("<h4>Incorrect Answers: " + incorrectCounter + "</h4>");
        $("#gameMessage").append("<h4>Unanswered Questions: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 5);



    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerSeconds'>30</span>");
        $("#questionDead").show();


        startTrivia();


    })


});
