(function () {
  let questions = [
    {
      question: "What does 'Wort' mean in Elite??",
      choices: ["Whot", "It is an expression that they are surprised", "GO!"],
      correctAnswer: 2,
    },
    {
      question:
        "spartan 117 was kidnapped as a child and put in a program. what did they call the program?",
      choices: [
        "Spartan-III programme",
        "Spartan-II programme",
        "Spartan-I programme",
      ],
      correctAnswer: 1,
    },
    {
      question: "Wat do ODST stand for?",
      choices: [
        "Orbital Drop Shock Troppers",
        "ONI Drap Shock Troppers",
        "Orbital Drop Shock Torpidos",
      ],
      correctAnswer: 0,
    },
    {
      question: "who is Jhone's biologicol mother?",
      choices: ["Anna", "Dr.Holsy", "We do not know"],
      correctAnswer: 2,
    },
    {
      question: "What is the name of Master Chif's team?",
      choices: ["Bravo Team", "Blue Team", "Siera Team"],
      correctAnswer: 1,
    },
    {
      question:
        "What are the names of the Elites player 3 and 4 can play ass in halo 3?",
      choices: [
        "N'tho 'Sramo and Usze 'Taham",
        "They have no name",
        "Shalo and Namo",
      ],
      correctAnswer: 0,
    },
  ];
  //   Array End
  let questionCounter = 0;
  let selections = [];
  let quiz = $("#quiz");
  //
  displayNext();
  $("#next").on("click", function (e) {
    e.preventDefault();
    if (quiz.is(":animated")) {
      return false;
    }
    choose();

    if (isNaN(selections[questionCounter])) {
      console.log("Please select a answer");
      //
    } else {
      questionCounter++;
      displayNext();
    }
  });
  $("#prev").on("click", function (e) {
    e.preventDefault();
    //
    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter;
    displayNext();
  });
  $("#start").on("click", function (e) {
    e.preventDefault();
    //
    if (quiz.is(":animated")) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $("#start").hide();
  });
  //
  $(".button").on("mouseenter", function () {
    $(this).addClass("active");
  });
  //
  $(".button").on("mouseleave", function () {
    $(this).removeClass("active");
  });
  //
  function createQuestionElement(index) {
    let qElement = $("<div>", {
      id: "question",
    });
    //
    let header = $("<h2>Question " + (index + 1) + ":</h2>");
    qElement.append(header);
    let question = $("<p>").append(questions[index].question);
    qElement.append(question);
    let radioButtons = createRadios(index);
    qElement.append(radioButtons);
    return qElement;
  }
  function createRadios(index) {
    let radioList = $("<ul>");
    let item;
    let input = "";
    for (let i = 0; i < questions[index].choices.length; i++) {
      item = $("<li>");
      input = '<input type="radio" name="answer" value=' + i + " />";
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  //
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  //
  function displayNext() {
    quiz.fadeOut(function () {
      $("#question").remove();
      //
      if (questionCounter < questions.length) {
        let nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        //
        if (!isNaN(selections[questionCounter])) {
          $("input[value=" + selections[questionCounter] + "]").prop(
            "checked",
            true
          );
        }
        //
        if (questionCounter === 1) {
          $("#prev").show();
        } else if (questionCounter === 0) {
          $("#prev").hide();
          $("#next").show();
        }
        //
      } else {
        let scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $("#next").hide();
        $("#prev").hide();
        $("#start").show();
      }
    });
  }
  //
  function displayScore() {
    let score = $("<p>", { id: "question" });
    let numCorrect = 0;
    for (let i = 0; i < selections.length; i++) {
      //
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    score.append(
      "You got " +
        numCorrect +
        " questions out of " +
        questions.length +
        " right!!!"
    );
    //
    return score;
  }
})();
