const questionAnswer = [
  {
    question: "Which of these pokemon is the fastest?",
    options: {
      a: "Pikachu",
      b: "Rapidash",
      c: "Steelix",
      d: "Tyranitar",
    },
    answer: "b",
  },
  {
    question:
      "In every mainline pokemon game the player receives a device that records information about every pokemon they encounter.  What is this device called?",
    options: {
      a: "PokePedia",
      b: "EncyclomMon",
      c: "Notebook",
      d: "PokeDex",
    },
    answer: "d",
  },
  {
    question:
      "Which of these moves are no longer learnable in Pokemon Sword and Shield",
    options: {
      a: "Stored Power",
      b: "Hidden Power",
      c: "Ancient Power",
      d: "Earth Power",
    },
    answer: "b",
  },
  {
    question:
      "What stat does the weather sandstorm raise for rock-type pokemon?",
    options: {
      a: "Speed",
      b: "HP",
      c: "Def",
      d: "Sp. Def",
    },
    answer: "d",
  },
  {
    question: "What does EV stand for?",
    options: {
      a: "Electric Vial",
      b: "Elemental Volt",
      c: "Extreme Vise",
      d: "Effort Values",
    },
    answer: "d",
  },
  {
    question: "Who won the Pokemon World Championships in 2016",
    options: {
      a: "Ray Rizzo",
      b: "Sejun Park",
      c: "Wolfe Glick",
      d: "Zachary Bokhari",
    },
    answer: "c",
  },
  {
    question:
      "What iconic Follow Me support pokemon did Sejun Park include in his world championship winning team in Pokemon X?",
    options: {
      a: "Clefairy",
      b: "Togekiss",
      c: "Pachirisu",
      d: "Raichu",
    },
    answer: "c",
  },
];

let trivia = document.getElementById("trivia");
let start = document.getElementById("start");
let body = document.querySelector("body");
let highScore = document.createElement("p");

let index = 0;
let score = 0;
const questionAnswerLen = questionAnswer.length;
let clock, form, countDown;
let timeRemaining = 240;
function timer() {
  clock = document.createElement("p");
  trivia.appendChild(clock);
  clock.textContent = timeRemaining;
  timeRemaining--;
  countdown = setInterval(function () {
    if (timeRemaining == 0) {
      clock.remove();
    }
    clock.textContent = timeRemaining;
    timeRemaining--;
  }, 1000);
}
function fetchData() {
  let savedScore = JSON.parse(localStorage.getItem("savedScores"));
  if (savedScore !== null) {
    body.appendChild(highScore);
    highScore.textContent = `${savedScore[0]}'s Last Score : ${savedScore[1]}/${questionAnswerLen}`;
  } else {
    highScore.remove();
  }
}
fetchData();
function startup() {
  start.setAttribute("style", "display: none");
  timer();
  prompt();
}
start.addEventListener("click", startup);
function prompt() {
  form = document.createElement("form");
  form.setAttribute("id", "quiz");
  trivia.appendChild(form);
  let questionText = document.createElement("p");
  form.appendChild(questionText);
  questionText.textContent = questionAnswer[index].question;
  questionOptions = questionAnswer[index].options;
  for (var key in questionOptions) {
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", key);
    input.setAttribute("value", key);
    input.setAttribute("name", "option");
    form.appendChild(input);
    let label = document.createElement("label");
    label.setAttribute("for", key);
    label.textContent = questionOptions[key];
    form.appendChild(label);
    const br = document.createElement("br");
    form.appendChild(br);
  }
  let submit = document.createElement("button");
  submit.setAttribute("id", "submitBtn");
  form.appendChild(submit);
  submit.setAttribute("style", "background-color: red; color: white;");
  submit.textContent = "Submit";
  submit.addEventListener("click", function (event) {
    event.preventDefault();
    let inputs = form.querySelectorAll("input");
    for (const element of inputs) {
      if (element.checked) {
        var response = element.getAttribute("value");
      }
    }
    if (response == questionAnswer[index].answer) {
      score++;
      console.log(score);
    } else {
      timeRemaining -= 10;
    }
    if (index + 1 < questionAnswerLen) {
      index++;
      form.remove();
      prompt();
    } else {
      //this probably should be a separate function :(
      trivia.removeChild(form);
      let scoreText = document.createElement("p");
      trivia.appendChild(scoreText);
      scoreText.textContent = score;
      let scoreForm = document.createElement("form");
      scoreForm.setAttribute(
        "style",
        "display: flex; flex-direction: column; justify-content:center; align-items:center;"
      );
      trivia.appendChild(scoreForm);

      let initials = document.createElement("div");
      initials.setAttribute("style", "width: 100%;");
      scoreForm.appendChild(initials);
      let initialsInput = document.createElement("input");
      initialsInput.setAttribute("type", "text");
      initialsInput.setAttribute("id", "initials");
      initialsInput.setAttribute("name", "initials");
      initialsInput.setAttribute("style", "border-radius: 15px;");
      var initialsLabel = document.createElement("label");
      initialsLabel.setAttribute("for", "initials");
      initialsLabel.setAttribute(
        "style",
        "color: white; margin-right: 20px; font-size: 1.4rem;"
      );
      initialsLabel.textContent = "Your Initials Here:";
      initials.appendChild(initialsLabel);
      initials.appendChild(initialsInput);
      let saveBtn = document.createElement("button");
      scoreForm.appendChild(saveBtn);
      saveBtn.textContent = "SAVE";
      saveBtn.setAttribute(
        "style",
        "background-color: rgba(62, 200, 255, 0.712); color: white; display: block; width: 80px; height: 40px; border-radius: 20px;"
      );
      saveBtn.addEventListener("click", function () {
        localStorage.setItem(
          "savedScores",
          JSON.stringify([initialsInput.value, score])
        );
        scoreForm.remove();
        saveBtn.remove();
        restart();
      });
    }
  });
}
function restart() {
  let triviaElements = trivia.children;
  if (trivia.children) {
    for (let i = 2; i < triviaElements.length; i++) {
      triviaElements[i].setAttribute("style", "display: none");
    }
  }
  let replay = document.createElement("button");
  trivia.appendChild(replay);
  replay.textContent = "One More Time?";
  replay.setAttribute(
    "style",
    "background-color: rgba(62, 200, 255, 0.712); color: white; display: block; width: 80px; height: 40px; border-radius: 20px;"
  );
  replay.addEventListener("click", function () {
    for (var el of triviaElements) {
      el.setAttribute("style", "display: none;");
    }
    timeRemaining = 240;
    index = 0;
    score = 0;
    fetchData();
    startup();
  });
}
